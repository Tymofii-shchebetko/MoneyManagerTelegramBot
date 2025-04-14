// Class to manage user flow and actions
class TelegramUserFlowManager {
  constructor(sheet, translations) {
    this.sheet = sheet;
    this.translations = translations;
  }

  handleUser(chatId, userMessage) {
    let userRow = this.findUserRow(chatId);

    if (userRow) {
      this.routeUserFlow(userRow, userMessage, chatId);
    } else {
      this.registerNewUser(chatId);
      let newRow = this.sheet.getLastRow();
      this.send(chatId, this.translations.getRange("A1").getValue(), GREETINGS_INLINE);
      this.routeUserFlow(newRow, userMessage, chatId);
    }
  }

  findUserRow(chatId) {
    const finder = this.sheet.createTextFinder(chatId).findNext();
    return finder ? finder.getRow() : null;
  }

  registerNewUser(chatId) {
    this.sheet.appendRow([chatId]);
  }

  routeUserFlow(userRow, message, chatId) {
    const endpoint = this.sheet.getRange(userRow, endPointNum).getValue();

    if (message === "/start") {
      this.send(chatId, this.translations.getRange("A52").getValue());
      return;
    }

    if (endpoint) {
      this.routeToEndpoint(endpoint, userRow, message, chatId);
    } else {
      this.handleFallback(message, userRow, chatId);
    }
  }

  routeToEndpoint(endpoint, userRow, message, chatId) {
    switch (endpoint) {
      case "normal":
        this.handleNormal(userRow, message, chatId);
        break;

      case "creatingAccounts":
        this.handleAccountCreation(userRow, message, chatId);
        break;

      case "delete":
        this.handleDeleteFlow(userRow, message, chatId);
        break;

      case "change_1":
        this.handleChangeOne(userRow, message, chatId);
        break;

      case "change_2":
        this.handleChangeTwo(userRow, message, chatId);
        break;

      case "currencySetting":
        this.handleCurrencySetting(userRow, message, chatId);
        break;

      default:
        console.warn(`Unknown endpoint: ${endpoint}`);
        this.send(chatId, "⚠️ Unknown state. Please type /start.");
    }
  }

  handleNormal(userRow, message, chatId) {
    const replies = {
      "instruction_callback": "A26",
      "/menu": "A43",
      "/edit": "A44",
      "/help": "A26",
      "/currency": "A45"
    };

    if (replies[message]) {
      if (message === "/edit") this.updateEndpoint(userRow, "creatingAccounts");
      if (message === "/currency") this.updateEndpoint(userRow, "currencySetting");
      this.send(chatId, this.translations.getRange(replies[message]).getValue(), BACK_INLINE);
    } else {
      NormalEndpoint(userRow, chatId, message);
    }
  }

  handleAccountCreation(userRow, message, chatId) {
    switch (message) {
      case "/change":
        ChangePercentButton(userRow, chatId);
        break;
      case "/delete":
        DeleteAccountsButton(userRow, chatId);
        break;
      case "edit_done":
        this.updateEndpoint(userRow, "normal");
        this.clearEnteredData(userRow);
        this.send(chatId, this.translations.getRange("A24").getValue(), INSTRUCTIONS_INLINE);
        break;
      case "back_button":
        this.updateEndpoint(userRow, "normal");
        this.send(chatId, this.translations.getRange("A48").getValue());
        break;
      default:
        CreatingValidation(userRow, message, chatId);
    }
  }

  handleDeleteFlow(userRow, message, chatId) {
    if (message === "changes_done") {
      ChangeesDone(userRow, chatId);
    } else {
      const percent = Number(message);
      if (isNaN(percent)) {
        this.send(chatId, this.translations.getRange("A15").getValue());
      } else {
        this.send(chatId, this.translations.getRange("A49").getValue());
        DeleteAccounts(userRow, percent);
        DeleteAccountsButton(userRow, chatId);
      }
    }
  }

  handleChangeOne(userRow, message, chatId) {
    if (message === "changes_done") {
      ChangeesDone(userRow, chatId);
    } else {
      ChangeOneCallback(message, userRow, chatId);
    }
  }

  handleChangeTwo(userRow, message, chatId) {
    if (message === "back_button") {
      ChangeBackButton(userRow, chatId);
    } else {
      ChangingPersentValidation(userRow, message, chatId);
    }
  }

  handleCurrencySetting(userRow, message, chatId) {
    if (message === "back_button") {
      this.updateEndpoint(userRow, "normal");
      this.send(chatId, this.translations.getRange("A47").getValue());
    } else {
      SetCurrency(message, userRow, chatId);
      this.updateEndpoint(userRow, "normal");
    }
  }

  handleFallback(message, userRow, chatId) {
    switch (message) {
      case "more_info":
        this.send(chatId, this.translations.getRange("A4").getValue(), CREATEACCS_INLINE);
        break;
      case "create_acc":
        StartUsingButton(chatId, userRow);
        break;
      default:
        Logger.log(`Unhandled message: ${message}`);
    }
  }

  updateEndpoint(userRow, endpoint) {
    this.sheet.getRange(userRow, endPointNum).setValue(endpoint);
  }

  clearEnteredData(userRow) {
    this.sheet.getRange(userRow, enteredData).setValue("");
  }

  send(chatId, text, inlineKeyboard = null) {
    sendMessage(chatId, text, inlineKeyboard);
  }
}
