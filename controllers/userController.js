const User = require('../models/user');
const config = require('../config/sequelize');
const multer = require('multer');
const express = require('express');



// Configure multer to specify where and how to store uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Function to handle profile photo upload
// Function to handle profile photo upload
exports.uploadProfilePhoto = async (req, res) => {
  try {
    // Get the user ID from the URL
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a file was uploaded
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the filename of the uploaded file (multer adds 'filename' to 'req.file')
    const filename = req.file.filename;

    // Save the filename as the user's profilePhoto (assuming you have a profilePhoto field in your schema)
    user.profilePhoto = filename;
    await user.save();

    // Construct the URL for the profile photo based on your server configuration
    const baseUrl = 'https://realter-backend.onrender.com'; // Replace with your server's base URL
    const profilePhotoUrl = `${baseUrl}/uploads/${filename}`; // Adjust the path as per your file storage setup

    console.log(`Profile photo saved for user ID ${userId}, filename: ${filename}`);

    res.status(200).json({ message: 'Profile photo uploaded', profilePhotoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


