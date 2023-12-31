const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

// Earn referral points
router.post('/earn', referralController.earnReferralPoints);

// Redeem referral points
router.post('/redeem', referralController.redeemReferralPoints);

// List referral points transactions
router.get('/transactions', referralController.listReferralPoints);

// Get referral points transactions by user ID
router.get('/users/:userId/', referralController.getReferralPointsByUser);

// Get redemption transactions by user ID
router.get('/users/redeem/:userId/', referralController.getRedemptionByUser); // New route for redemption transactions

module.exports = router;
