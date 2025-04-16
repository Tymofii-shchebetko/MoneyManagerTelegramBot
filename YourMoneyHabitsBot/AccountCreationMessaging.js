const DONE_INLINE = { parse_mode: "HTML" };

function getTranslation(keyCell) {
  return translationsSheet.getRange(keyCell).getValue();
}

function sendPartialAccountSuccess(userId, leftPercent, chatId) {
  sendMessage(chatId, getTranslation("A50")); // "Accounts created" confirmation
  
  PrepareCreatedAccounts(userId); // updates `createdAccountsList`

  const message =
    `👌 ✅ ${getTranslation("A10")}` + // "Your accounts:"
    `${createdAccountsList}` +
    `${getTranslation("A11")}` +      // "You have "
    `${leftPercent}%` +
    `${getTranslation("A23")}` +      // "% remaining to distribute"
    `${getTranslation("A12")}`;       // "You can now..."
  
  sendMessage(chatId, message);
}

function sendFullAccountSuccess(userId, chatId) {
  sendMessage(chatId, getTranslation("A50"));

  PrepareCreatedAccounts(userId);

  const message =
    `👌 ✅ ${getTranslation("A10")}` + // "Your accounts:"
    `${createdAccountsList}` +
    `${getTranslation("A12")}`;       // "You can now..."

  sendMessage(chatId, message, DONE_INLINE);
}
