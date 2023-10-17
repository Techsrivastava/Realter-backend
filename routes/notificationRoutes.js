const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const router = express.Router();
const notificationController = require('../controllers/notificationController');


// Initialize an empty object to store connected clients
const connectedClients = {};

// Updated route definition
app.get('/generateNotifications/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Logic to find property matches and create notifications
      // When a match is found, send a real-time notification to the connected client
      const matchedPropertyMessage = 'Your property matches with another user\'s property.';
      const matchingProperty = {}; // Replace with actual matching property data
  
      // Check if the user is connected and has a registered socket
      if (connectedClients[userId]) {
        connectedClients[userId].emit('notification', { userId, message: matchedPropertyMessage, matchingProperty });
      }
  
      // Return a response to the client
      res.status(200).json({ message: 'Notifications sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  




// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Other notification-related routes...

module.exports = router;
