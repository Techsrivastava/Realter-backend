const Category = require('../models/category');

const config = require('../config/sequelize');

// Create a category
function createCategory(req, res) {
  Category.create(req.body)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Get all categories
function getAllCategories(req, res) {
  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Get a category by ID
function getCategoryById(req, res) {
  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Update a category by ID
function updateCategory(req, res) {
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

// Delete a category by ID
function deleteCategory(req, res) {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted' });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
