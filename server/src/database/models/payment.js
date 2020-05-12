const mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
  user: Object,
  card: Object,
  boughts: Array
});

var payment = mongoose.model('payments', paymentSchema);

module.exports = payment