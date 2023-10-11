const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

// Create a type
router.post('/', typeController.createType);

// Get all types
router.get('/', typeController.getAllTypes);

// Get a type by ID
router.get('/:id', typeController.getTypeById);

// Update a type by ID
router.put('/:id', typeController.updateType);

// Delete a type by ID
router.delete('/:id', typeController.deleteType);

module.exports = router;
