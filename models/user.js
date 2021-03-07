const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);