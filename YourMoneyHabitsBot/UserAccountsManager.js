// UserAccountsManager.gs

const ACCOUNTS_NUM = 5; // replace with actual column number
const LAST_CELL_NUM = 20; // replace with actual column number
const TOTAL_PERCENT_NUM = 21;
const ENDPOINT_NUM = 22;
const ENTERED_DATA = 23;
const CURRENCY_NUM = 24;

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserData"); // update sheet name

function clearCell(userId, columnNum) {
  sheet.getRange(userId, columnNum).setValue("");
}

function setCell(userId, columnNum, value) {
  sheet.getRange(userId, columnNum).setValue(value);
}

function getCell(userId, columnNum) {
  return sheet.getRange(userId, columnNum).getValue();
}

// Main Functionalities

// Add new account: accountName (string), percent (string/number)
function addAccount(userId, percent, accountName) {
  percent = percent.toString().trim();
  accountName = accountName.toString().trim();

  sheet.getRange(userId, ACCOUNTS_NUM).insertCells(SpreadsheetApp.Dimension.COLUMNS).setValue("0");
  sheet.getRange(userId, ACCOUNTS_NUM).insertCells(SpreadsheetApp.Dimension.COLUMNS).setValue(percent);
  sheet.getRange(userId, ACCOUNTS_NUM).insertCells(SpreadsheetApp.Dimension.COLUMNS).setValue(accountName);
}

// Delete the last account (remove 3 columns for the last account)
function deleteLastAccount(userId, accountStartColumn) {
  let lastCell = Number(getCell(userId, LAST_CELL_NUM)) - 3;
  setCell(userId, LAST_CELL_NUM, lastCell);

  const oldPercent = Number(getCell(userId, TOTAL_PERCENT_NUM));
  const deletedPercent = Number(getCell(userId, accountStartColumn + 1));
  const newTotalPercent = oldPercent - deletedPercent;

  setCell(userId, TOTAL_PERCENT_NUM, newTotalPercent);

  for (let i = 0; i < 3; i++) {
    sheet.getRange(userId, accountStartColumn).deleteCells(SpreadsheetApp.Dimension.COLUMNS);
  }
}

// Change the value of a percent cell
function changePercent(userId, cellId, newValue, chatId) {
  setCell(userId, ENDPOINT_NUM, "creatingAccounts");
  setCell(userId, cellId, newValue);
  clearCell(userId, ENTERED_DATA);
  changesDone(userId, chatId);
}

// Set the user's currency preference
function setCurrency(userId, newCurrency, chatId) {
  setCell(userId, CURRENCY_NUM, newCurrency);
  const confirmationText = translationsSheet.getRange("A46").getValue();
  sendMessage(chatId, confirmationText);
  generateAccountsStatistics(userId, chatId);
}
