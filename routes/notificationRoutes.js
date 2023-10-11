const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Generate notifications
router.get('/generate', notificationController.generateNotifications);

// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Other notification-related routes...

module.exports = router;
