const mongoose = require('mongoose');

// create table for registered users
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  loginTime: {
    type: String,
    default: ''
  },
  loggedOutTime: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('users', userSchema);
