const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user receiving the notification
  matchedProperty: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }, // Reference to the matched property
  message: String, // Notification message
});

module.exports = mongoose.model('Notification', notificationSchema);
