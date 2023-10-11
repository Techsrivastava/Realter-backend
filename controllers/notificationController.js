const Notification = require('../models/notification');
const Property = require('../models/property'); // Assuming you have a Property model
const config = require('../config/sequelize');

// Function to generate notifications when properties match
async function generateNotifications() {
  try {
    // Retrieve all properties from the database
    const properties = await Property.find();

    // Iterate through each property to check for matches
    for (const property of properties) {
      // Logic to find matching properties based on criteria (e.g., city, size, price, payment mode)
      const matchingProperties = await findMatchingProperties(property);

      // Generate notifications for matched properties and users
      for (const matchingProperty of matchingProperties) {
        const user1 = property.user; // User who posted the property
        const user2 = matchingProperty.user; // User who posted the matching property

        // Create notifications for both users
        await createNotification(user1, matchingProperty);
        await createNotification(user2, property);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to find matching properties based on criteria
async function findMatchingProperties(property) {
  // Define your criteria for matching properties here, e.g., based on city, size, price, payment mode
  const criteria = {
    city: property.city,
    size: property.size,
    price: property.price,
    paymentMode: property.paymentMode,
    type: property.type,
    amenities: property.amenities,
    category: property.category,
    
  };

  // Use these criteria to find matching properties in the database
  const matchingProperties = await Property.find(criteria);

  return matchingProperties;
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
