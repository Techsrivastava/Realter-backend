const Type = require('../models/type');
const config = require('../config/sequelize');

// Create a type
function createType(req, res) {
  Type.create(req.body)
    .then((type) => {
      res.json(type);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Get all types
function getAllTypes(req, res) {
  Type.find()
    .then((types) => {
      res.json(types);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get a type by ID
function getTypeById(req, res) {
  Type.findById(req.params.id)
    .then((type) => {
      if (!type) {
        return res.status(404).json({ message: 'Type not found' });
      }
      res.json(type);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Update a type by ID
function updateType(req, res) {
  Type.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((type) => {
      if (!type) {
        return res.status(404).json({ message: 'Type not found' });
      }
      res.json(type);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Delete a type by ID
function deleteType(req, res) {
  Type.findByIdAndRemove(req.params.id)
    .then((type) => {
      if (!type) {
        return res.status(404).json({ message: 'Type not found' });
      }
      res.json({ message: 'Type deleted' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = {
  createType,
  getAllTypes,
  getTypeById,
  updateType,
  deleteType,
};
