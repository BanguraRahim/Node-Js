const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,
    Admin: Number
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: String
});

module.exports = mongoose.model('User', userSchema);