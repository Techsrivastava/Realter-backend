const mongoose = require('mongoose');

const referralPointsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  earned: Boolean, // True for earned points, false for redeemed points
  date: Date,
});

module.exports = mongoose.model('ReferralPoints', referralPointsSchema);
