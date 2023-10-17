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

 
// Get referral points transactions by user ID
function getReferralPointsByUser(req, res) {
  const { userId } = req.params;

  ReferralPoints.find({ user: userId })
    .then((transactions) => {
      if (transactions.length === 0) {
        console.log(`No referral points transactions found for the user with ID: ${userId}`);
        res.status(200).json({ message: 'No referral points transactions found for the specified user.' ,transactions: []});
      } else {
        // Map transactions to the desired format
        const formattedTransactions = transactions.map(transaction => ({
          
          points: transaction.points
         
         
         
        }));
        res.json(formattedTransactions);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

// Get redemption transactions by user ID
function getRedemptionByUser(req, res) {
  const { userId } = req.params;

  ReferralPoints.find({ user: userId, earned: true }) // Filter for redemption transactions
    .then((redemptionTransactions) => {
      if (redemptionTransactions.length === 0) {
        console.log(`No redemption transactions found for the user with ID: ${userId}`);
        res.status(200).json({ message: 'No redemption transactions found for the specified user.', transactions: [] });
      } else {
        // Map redemption transactions to the desired format
        const formattedRedemptionTransactions = redemptionTransactions.map(transaction => ({
          _id: transaction._id,
          points: transaction.points,
          earned: transaction.earned,
          date: transaction.date,
          __v: transaction.__v,
        }));
        res.json(formattedRedemptionTransactions);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

module.exports = {
  earnReferralPoints,
  redeemReferralPoints,
  listReferralPoints,
  getReferralPointsByUser,
  getRedemptionByUser, // Add the new function to the exports
};








