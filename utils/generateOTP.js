// generateOTP.js

// Generate a random 6-digit OTP
function generateOTP() {
    const otpLength = 6;
    let otp = '';
  
    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10); // Random digit between 0 and 9
    }
  
    return otp;
  }
  
  module.exports = generateOTP;
  