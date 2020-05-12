const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  Carousels: Array,
  FullBanners: Array,
  Categories: Array,
  Interested: Array,
  TopSale: Array,
  News: Array,
  NewForYou: Array
});

var category = mongoose.model('categories', categorySchema);

module.exports = category