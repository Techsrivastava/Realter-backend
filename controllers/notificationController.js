const Notification = require('../models/notification');

// Function to generate notifications when properties match
async function generateNotifications() {
  // Logic to find matching properties based on criteria (e.g., city, size, price, payment mode)
  const matchingProperties = await findMatchingProperties();

  // Generate notifications for matched properties and users
  matchingProperties.forEach(async (matchingProperty) => {
    const user1 = matchingProperty.user; // User who posted the matching property
    const user2 = matchingProperty.matchedWithUser; // Other user who posted a matching property

    // Create notifications for both users
    await createNotification(user1, matchingProperty);
    await createNotification(user2, matchingProperty);
  });
}

// Function to create a notification
async function createNotification(userId, matchingProperty) {
  const notification = new Notification({
    user: userId,
    matchedProperty: matchingProperty._id,
    message: 'Your property matches with another user\'s property.',
  });

  await notification.save();
}

// Function to retrieve notifications for a user
async function getUserNotifications(req, res) {
  const userId = req.params.userId; // Assuming you pass the user's ID in the request parameters

  try {
    // Find notifications for the specified user
    const notifications = await Notification.find({ user: userId }).populate('matchedProperty');

    // Log the notifications for the user
    console.log(`Notifications for User ${userId}:`);
    notifications.forEach((notification) => {
      console.log(`- Notification ID: ${notification._id}`);
      console.log(`  Message: ${notification.message}`);
      console.log(`  Matched Property: ${notification.matchedProperty._id}`);
    });

    // Send the retrieved notifications as a response
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Other notification-related functions...

module.exports = {
  generateNotifications,
  createNotification,
  getUserNotifications,
  // Other functions...
};
