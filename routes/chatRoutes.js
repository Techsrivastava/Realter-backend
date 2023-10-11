const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define a route to save a chat message
router.post('/save-message', async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    await chatController.saveMessage(sender, receiver, message);
    res.json({ success: true, message: 'Message saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to save the message' });
  }
});

module.exports = router;
