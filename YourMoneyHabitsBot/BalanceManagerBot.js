class BalanceManagerBot {
  constructor(userId, chatId, usersText) {
    this.userId = userId;
    this.chatId = chatId;
    this.usersText = usersText;
    this.amount = null;
    this.amountCell = googlSheet.getRange(userId, enteredData);
    this.userLastCell = googlSheet.getRange(userId, lastCellNum).getValue();
    this.percentStartCell = accountsNum + 1;
  }

  handleInput() {
    if (this.amountCell.isBlank() && isNaN(Number(this.usersText))) {
      this.send(translationsSheet.getRange("A27").getValue());
    } else {
      this.processAmount();
    }
  }

  processAmount() {
    const value = Number(this.usersText);

    if (isNaN(value)) {
      this.handleOperation();
    } else if (value < 0) {
      this.setAmount(-value);
      this.handleOperation(translationsSheet.getRange("A29").getValue());
    } else if (this.usersText.startsWith("+")) {
      this.setAmount(value);
      this.handleOperation(translationsSheet.getRange("A28").getValue());
    } else if (value === 0) {
      this.send(translationsSheet.getRange("A33").getValue());
    } else {
      this.setAmount(value);
      const text = translationsSheet.getRange("A30").getValue() + value + "?";
      this.send(text, KEYBOARD_OPERATION);
    }
  }

  handleOperation(optionText = this.usersText) {
    this.amount = googlSheet.getRange(this.userId, enteredData).getValue();

    const withdrawText = translationsSheet.getRange("A29").getValue();
    const depositText = translationsSheet.getRange("A28").getValue();

    if (optionText === withdrawText) {
      googlSheet.getRange(this.userId, enteredData).setValue(-this.amount);
      this.prepareAccountSelection();
      this.send(translationsSheet.getRange("A34").getValue() + this.amount + "?", KEYBOARD);
    } else if (optionText === depositText) {
      this.prepareAccountSelection();
      this.send(translationsSheet.getRange("A35").getValue() + this.amount + "?", KEYBOARD);
    } else {
      this.processAccountSelection();
    }
  }

  processAccountSelection() {
    if (this.usersText === translationsSheet.getRange("A31").getValue()) {
      this.calculateAllAccounts();
    } else {
      const accIndex = Number(this.usersText.substr(0, 2));
      const targetCell = (accountsNum - 1) + accIndex * 3;
      this.calculateSpecificAccount(targetCell);
    }
  }

  calculateAllAccounts() {
    let totalAmount = Math.abs(Number(this.amount));
    const last = Number(this.userLastCell);

    for (let i = this.percentStartCell; i <= last; i += 2) {
      const percent = Number(googlSheet.getRange(this.userId, i).getValue());
      const adjustment = (totalAmount * percent) / 100;

      const currentBalance = Number(googlSheet.getRange(this.userId, i + 1).getValue());
      const newBalance = this.amount < 0
        ? currentBalance - adjustment
        : currentBalance + adjustment;

      googlSheet.getRange(this.userId, i + 1).setValue(newBalance.toFixed(2));
    }

    googlSheet.getRange(this.userId, enteredData).setValue("");
    const messageKey = this.amount < 0 ? "A36" : "A37";
    this.send(translationsSheet.getRange(messageKey).getValue(), REMOVE_KEYBOARD);
    AccountsStatisticMaker(this.userId, this.chatId);
  }

  calculateSpecificAccount(cell) {
    const currentBalance = Number(googlSheet.getRange(this.userId, cell).getValue());
    const result = (currentBalance + Number(this.amount)).toFixed(2);
    googlSheet.getRange(this.userId, cell).setValue(result);
    googlSheet.getRange(this.userId, enteredData).setValue("");

    this.send(translationsSheet.getRange("A42").getValue(), REMOVE_KEYBOARD);
    AccountsStatisticMaker(this.userId, this.chatId);
  }

  setAmount(value) {
    googlSheet.getRange(this.userId, enteredData).setValue(value);
  }

  prepareAccountSelection() {
    PrepareAccountsAndPercents(this.userId);
  }

  send(message, keyboard = null) {
    sendMessage(this.chatId, message, keyboard);
  }
}
}
