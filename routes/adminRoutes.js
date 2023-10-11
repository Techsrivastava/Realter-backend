// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create an admin
router.post('/', adminController.createAdmin);

// Admin login route
router.post('/login', adminController.adminLogin);

// Retrieve all admins
router.get('/', adminController.getAllAdmins);

// Retrieve a specific admin by ID
router.get('/:id', adminController.getAdminById);

// Update an admin's details
router.put('/:id', adminController.updateAdmin);

// Delete an admin by ID
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
