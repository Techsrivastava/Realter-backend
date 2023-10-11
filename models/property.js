const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created the property
  title: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  price: Number,
  city: String,
  size: String,
  mustNeeded: String,
  paymentMode: String,
  maxCash: Number,
  amenities: [String], // Assuming amenities are represented as an array of strings
});

module.exports = mongoose.model('Property', propertySchema);
