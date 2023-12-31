const Notification = require('../models/notification');
const Property = require('../models/property'); // Assuming you have a Property model
const config = require('../config/sequelize');
const io = require('../socket');


// Function to generate notifications when properties match
async function generateNotifications(userId) {
  try {
    // Retrieve the properties of the specified user from the database
    const userProperties = await Property.find({ user: userId });

    // Initialize an empty result object
    let result = {};

    // Iterate through each property of the user to check for matches and generate notifications
    for (const userProperty of userProperties) {
      // Logic to find matching properties based on criteria
      const matchingProperties = await Property.find({
        // Define your matching criteria here
        city: userProperty.city,
        size: { $gte: userProperty.size - 10, $lte: userProperty.size + 10 },
        price: { $gte: userProperty.price * 0.9, $lte: userProperty.price * 1.1 },
        paymentMode: userProperty.paymentMode,
        type: userProperty.type,
        amenities: { $in: userProperty.amenities },
        category: userProperty.category
      });

      // Check if the matching property belongs to a different user
      for (const matchingProperty of matchingProperties) {
        if (matchingProperty.user !== userId) {
          // Create a notification for the user with a matched property message
          const matchedPropertyMessage = 'Your property matches with another user\'s property.';
          const matchedPropertyNotification = new Notification({
            user: userId,
            matchedProperty: matchingProperty._id,
            message: matchedPropertyMessage,
          });
          await matchedPropertyNotification.save();

          // Create a notification for the other user with the same message
          const otherUserNotification = new Notification({
            user: matchingProperty.user,
            matchedProperty: userProperty._id,
            message: matchedPropertyMessage,
          });
          await otherUserNotification.save();

          // Add the matching property and message to the result object
          if (!result[userId]) {
            result[userId] = [];
          }
          result[userId].push({ matchingProperty, message: matchedPropertyMessage });
          
          // Emit a Socket.IO 'match' event to notify both users about the match
          io.getIO().emit('match', {
            userId: userId,
            matchingUserId: matchingProperty.user,
            message: matchedPropertyMessage,
          });
        }
      }

      // If no matching properties were found for this user's property
      if (matchingProperties.length === 0) {
        // Create a notification for the user with a no-match message
        const noMatchMessage = 'No matching properties were found for your listing.';
        const noMatchNotification = new Notification({
          user: userId,
          message: noMatchMessage,
        });
        await noMatchNotification.save();

        // Add the no-match message to the result object
        if (!result[userId]) {
          result[userId] = [];
        }
        result[userId].push({ message: noMatchMessage });
      }
    }

    // If result is still an empty object, set it to an empty array
    if (Object.keys(result).length === 0) {
      result = [];
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
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

    // Send the retrieved notifications as a response:smiley::smiley:
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Other notification-related functions...

module.exports = {
  getUserNotifications,
  generateNotifications

  // Other functions...
};
