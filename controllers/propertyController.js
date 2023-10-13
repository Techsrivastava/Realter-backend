const Property = require('../models/property');
const { Category, Type } = require('../models/category');
const config = require('../config/sequelize');

// Create a property
// Create a property with amenities
function createProperty(req, res) {
  Property.create(req.body)
    .then((property) => {
      res.json(property);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function createPropertyForUser(req, res) {
  const { userId } = req.params; // Get the user's ID from the route parameter
  const propertyData = req.body;

  // Set the user field with the user's ID
  propertyData.user = userId;

  Property.create(propertyData)
    .then((property) => {
      res.json(property);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Create amenities for a property
function createAmenities(req, res) {
  const { propertyId, amenities } = req.body;
  Property.findByIdAndUpdate(
    propertyId,
    { $push: { amenities: { $each: amenities } } },
    { new: true }
  )
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property.amenities);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Update amenities for a property
function updateAmenities(req, res) {
  const { propertyId, amenities } = req.body;
  Property.findByIdAndUpdate(
    propertyId,
    { amenities },
    { new: true }
  )
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property.amenities);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Delete amenities for a property
function deleteAmenities(req, res) {
  const { propertyId, amenityId } = req.params;
  Property.findByIdAndUpdate(
    propertyId,
    { $pull: { amenities: amenityId } }
  )
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Amenity deleted' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Other property CRUD functions remain unchanged


// Get all properties
function getAllProperties(req, res) {
  Property.find()
    .populate('category type')
    .exec()
    .then((properties) => {
      res.json(properties);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get a property by ID
function getPropertyById(req, res) {
  Property.findById(req.params.id)
    .populate('category type')
    .exec()
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Update a property by ID
function updateProperty(req, res) {
  Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Delete a property by ID
function deleteProperty(req, res) {
  Property.findByIdAndRemove(req.params.id)
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property deleted' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Get properties by category
function getPropertiesByCategory(req, res) {
  const category = req.params.category;

  Property.find({ category: category })
    .then((properties) => {
      if (properties.length === 0) {
        console.log(`No properties found in the category: ${category}`);
        res.status(200).json({ message: 'No properties found in the specified category.: ', properties });
      } else {
        res.json(properties);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}

function getPropertiesByUser(req, res) {
  const { userId } = req.params;

  Property.find({ user: userId })
    .populate('category type')
    .exec()
    .then((properties) => {
      if (properties.length === 0) {
        console.log(`No properties found for the user with ID: ${userId}`);
        res.status(404).json({ message: 'No properties found for the specified user.' });
      } else {
        res.json(properties);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
}


module.exports = {
  createProperty,
  createPropertyForUser,
  getAllProperties,
  getPropertiesByCategory,
  getPropertyById,
  updateProperty,
  deleteProperty,
  createAmenities,
  updateAmenities,
  deleteAmenities,
  getPropertiesByUser
};
