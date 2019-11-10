const mongoose = require('mongoose');

// create table for registered users
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  registrationTime: String,
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
