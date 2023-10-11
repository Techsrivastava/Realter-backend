const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create a category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

// Get category properties by ID
router.get('/:id/properties', categoryController.getCategoryPropertiesById);


module.exports = router;
