const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vue-dr', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connection successful')
});