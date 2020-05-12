const mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
  user: String,
  card: String,
  boughts: String
});

var payment = mongoose.model('payments', paymentSchema);

module.exports = payment