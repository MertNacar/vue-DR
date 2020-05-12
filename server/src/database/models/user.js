const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  email: String,
  password: String
});

var user = mongoose.model('users', userSchema);

module.exports = user