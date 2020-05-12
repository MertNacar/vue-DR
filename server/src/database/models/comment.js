const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  id: String,
  comments: Array
});

var comment = mongoose.model('comments', commentSchema);

module.exports = comment