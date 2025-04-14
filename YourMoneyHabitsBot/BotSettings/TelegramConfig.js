const TELEGRAM_TOKEN = "your_telegram_token";
const TELEGRAM_API_URL = "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/";

const googlSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("YourDataSheet");
const translationsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Translations");

const lastCellNum = 20;
const accountsNum = 5;
