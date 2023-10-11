const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, require: true, index:true, unique:true,sparse:true},// Add the phone field with the unique option
  location: String,
  profilePhoto: String,
  otp: String,
  isVerified: Boolean,
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Store the ID of the referring user
  referralPoints: { type: Number, default: 0 }, // Track referral points earned
});

module.exports = mongoose.model('User', userSchema);
