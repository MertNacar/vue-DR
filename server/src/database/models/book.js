const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  SubHeader: Object,
  FullBanners: Object,
  PopularSearch: Array,
  Book: Array,
  Featured: Array,
  Stationary: Array,
  Electronic: Array,
  HoobyToys: Array,
  GameConsole: Array
});

var book = mongoose.model('books', bookSchema);

module.exports = book