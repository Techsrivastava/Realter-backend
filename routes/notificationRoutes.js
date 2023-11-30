const express = require("express");
const app = express();
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Define a route to generate notifications for a specific user
router.post("/generateNotifications/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Import the generateNotifications function from the controller
    const notifications = await notificationController.generateNotifications(
      userId
    );

    // Respond with the generated notifications
    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get notifications for a user
router.get("/:userId", notificationController.getUserNotifications);

// Other notification-related routes...

module.exports = router;
