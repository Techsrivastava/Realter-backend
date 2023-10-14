const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Updated route definition
router.get('/generate/:userId', notificationController.generateNotifications);




// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Other notification-related routes...

module.exports = router;
