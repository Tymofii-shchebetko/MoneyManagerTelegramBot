function sendMessage(chat_id, text, keyBoard) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch(TELEGRAM_API_URL, data);
}

function buildSuccessMessage({ accounts, leftPercent = null }) {
  let message = `👌 ✅ ${getTranslation("A10")}${accounts}`;
  if (leftPercent !== null) {
    message += `${getTranslation("A11")}${leftPercent}%${getTranslation("A23")}`;
  }
  return message + getTranslation("A12");
}
