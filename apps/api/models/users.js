const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'banned'], default: 'active' }
});

module.exports = mongoose.model('User', userSchema);