const User = require('../models/user');
const config = require('../config/sequelize');
const ReferralPoints = require('../models/referralPoints');
const Property = require('../models/property');

// Earn referral points
function earnReferralPoints(req, res) {
  const { userId, points } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.referralPoints += points;
      user.save();

      const newReferralPoints = new ReferralPoints({
        user: userId,
        points,
        earned: true,
        date: new Date(),
      });

      newReferralPoints.save();

      res.json({ message: 'Referral points earned' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Redeem referral points
function redeemReferralPoints(req, res) {
  const { userId } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const pointsToDeduct = 5; // Deduct 5 points for property posting

      if (user.referralPoints >= pointsToDeduct) {
        // Deduct the points for property posting
        user.referralPoints -= pointsToDeduct;
        user.save();

        // Record the referral points transaction
        const newReferralPoints = new ReferralPoints({
          user: userId,
          points: pointsToDeduct,
          earned: false,
          date: new Date(),
        });

        newReferralPoints.save();

        res.json({ message: 'Referral points deducted for property posting' });
      } else {
        res.status(400).json({ message: 'Insufficient referral points for property posting' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

  
  

// List referral points transactions
function listReferralPoints(req, res) {
  ReferralPoints.find()
    .populate('user')
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = {
  earnReferralPoints,
  redeemReferralPoints,
  listReferralPoints,
};
