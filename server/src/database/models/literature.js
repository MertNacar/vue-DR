const mongoose = require('mongoose');

var literatureSchema = new mongoose.Schema({
  Categories: Array,
  Books: Array
});

var literature = mongoose.model('literatures', literatureSchema);

module.exports = literature