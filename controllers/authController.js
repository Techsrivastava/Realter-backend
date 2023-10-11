const User = require('../models/user');

const generateOTP = require('../utils/generateOTP');
const config = require('../config/multer');
// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, location } = req.body;

    // Check if the phone number is already registered
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    // Generate an OTP
    const otp = generateOTP();

    // Create a new user object
    const user = new User({
      name,
      phone,
      location,
      otp,
      isVerified: true,
    });

    // Save the user to the database
    await user.save();

    // Include the user ID in the response
    res.status(201).json({ message: 'Registration successful', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






// Handle file uploads (profile photo) using multer middleware
exports.uploadProfilePhoto = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the filename of the uploaded file
    const filename = req.file.filename;

    // You can now save the filename to the user's profile in the database
    // For example, if you have a user object with a profilePhoto field:
    // user.profilePhoto = filename;
    // await user.save();

    res.status(200).json({ message: 'Profile photo uploaded', filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Authenticate user with OTP
exports.loginUserWithOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Find the user by phone number
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number' });
    }

    // Check if the phone number is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Phone number not verified' });
    }

    // Check if the provided OTP matches the stored OTP
    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // You can generate a JWT token for the user here if needed.

    res.status(200).json({ message: 'Login successful', "userId": user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



