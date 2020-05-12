const mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
  id: String,
  class: String,
  title: String
});

var menu = mongoose.model('menus', menuSchema);

module.exports = menu