// adminController.js

const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create an admin
async function createAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Retrieve all admins
async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Retrieve a specific admin by ID
async function getAdminById(req, res) {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update an admin's details
async function updateAdmin(req, res) {
  const adminId = req.params.id;
  const updates = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(adminId, updates, { new: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an admin by ID
async function deleteAdmin(req, res) {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findByIdAndRemove(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function adminLogin(req, res) {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
  
      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, admin.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token for authentication
      const token = jwt.sign({ username: admin.username }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  adminLogin
};
