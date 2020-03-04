/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const cart = require("./src/routes/cart")
const category = require("./src/routes/category")
const home = require("./src/routes/home")
const auth = require("./src/routes/auth")

const app = express();


app.set('port', 7700);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use("/auth", auth)
<<<<<<< HEAD
app.use("/Sepetim", cart)
app.use("/kategori", category)
=======
app.use("/cart", cart)
app.use("/category", category)
>>>>>>> 12 requests done
app.use("/home", home)



app.listen(app.get('port'), () => {
<<<<<<< HEAD
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
=======
  console.log(`Find the server at: http://localhost:${app.get('port')}`); // eslint-disable-line no-console
>>>>>>> 12 requests done
});
