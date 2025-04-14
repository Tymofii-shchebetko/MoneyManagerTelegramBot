function doPost(e) {
  let contents = JSON.parse(e.postData.contents);
  let chat_id;
  let usersText;

  if (contents.callback_query) {
    chat_id = contents.callback_query.message.chat.id;
    usersText = contents.callback_query.data;
  } else if (contents.message) {
    chat_id = contents.message.chat.id;
    usersText = contents.message.text;
  }

  defineUser(chat_id, usersText); // You can route to different logic here
}


function onUserMessageReceived(chatId, message) {
  const manager = new TelegramUserFlowManager(googlSheet, translationsSheet);
  manager.handleUser(chatId, message);
}
