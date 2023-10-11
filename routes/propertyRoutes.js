const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Create a property
router.post('/post', propertyController.createProperty);
// Create a property for a user
router.post('/post/user/:userId', propertyController.createPropertyForUser);

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get a property by ID
router.get('/:id', propertyController.getPropertyById);

// Update a property by ID
router.put('/:id', propertyController.updateProperty);

// Delete a property by ID
router.delete('/:id', propertyController.deleteProperty);

// Create amenities for a property
router.post('/amenities', propertyController.createAmenities);

// Update amenities for a property
router.put('/amenities', propertyController.updateAmenities);

// Delete amenities for a property
router.delete('/amenities/:propertyId/:amenityId', propertyController.deleteAmenities);


module.exports = router;
