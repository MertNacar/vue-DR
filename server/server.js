/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const category = require("./src/routes/category")
const home = require("./src/routes/home")
const auth = require("./src/routes/auth")
const payment = require("./src/routes/payment")
require("./src/database/connection")

const app = express();
app.use(cors())

app.set('port', 7700);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/payment", payment)
app.use("/auth", auth)
app.use("/category", category)
app.use("/home", home)



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}`); // eslint-disable-line no-console
});
