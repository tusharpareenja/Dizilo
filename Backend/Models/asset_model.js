// models/Asset.js
const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Asset title
  description: { type: String }, // Asset description
  price: { type: Number, required: true }, // Price of the asset
  fileUrl: { type: String, required: true }, // URL of the uploaded file
  category: { type: String, required: true }, // Asset category
  images: [{ type: String }],
  category: [{type: String}],
  supportedSoftware: {type: String},
  tags: [String], // Optional tags for better searchability
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who uploaded
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Asset', assetSchema);
