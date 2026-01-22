const mongoose = require('mongoose');

const VaultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileType: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('vault', VaultSchema);