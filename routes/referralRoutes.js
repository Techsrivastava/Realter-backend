const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

// Earn referral points
router.post('/earn', referralController.earnReferralPoints);

// Redeem referral points
router.post('/redeem', referralController.redeemReferralPoints);

// List referral points transactions
router.get('/transactions', referralController.listReferralPoints);

module.exports = router;
