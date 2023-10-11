const ChatMessage = require('../models/ChatMessage');

function saveMessage(sender, receiver, message) {
  const chatMessage = new ChatMessage({
    sender,
    receiver,
    message,
    timestamp: new Date(),
  });

  return chatMessage.save();
}

module.exports = {
  saveMessage,
};
