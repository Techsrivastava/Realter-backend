const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true }, // User ID of the receiver
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
