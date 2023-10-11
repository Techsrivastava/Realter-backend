const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/authController');
const { loginUserWithOTP } = require('../controllers/authController');

// Route for user registration
router.post('/register', registerUser);

// Route for user login with OTP
router.post('/login', loginUserWithOTP);

module.exports = router;