const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  googleId: String,
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model('User', userSchema);
