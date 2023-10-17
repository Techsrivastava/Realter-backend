const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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



const { getUser, getAllUsers, uploadProfilePhoto } = require('../controllers/userController');

// Route for getting a specific user
router.get('/:userId', getUser);

// Route for getting all users
router.get('/', getAllUsers);

// Add a dynamic parameter for the user ID in the URL
router.post('/upload-profile-photo/:userId', upload.single('profilePhoto'), uploadProfilePhoto);


module.exports = router;
