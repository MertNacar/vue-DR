
const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


<<<<<<< HEAD
const CATEGORY_DATA_FILE = path.join(__dirname, 'src/datas/category-data.json');
const CATEGORY_2_DATA_FILE = path.join(__dirname, 'src/datas/category-2-data.json');

app.get('/Kitap', (req, res) => {
=======
const CATEGORY_DATA_FILE = path.join(__dirname, '../datas/category-data.json');
const CATEGORY_2_DATA_FILE = path.join(__dirname, '../datas/category-2-data.json');

router.get('/books', (req, res) => {
>>>>>>> 12 requests done
  fs.readFile(CATEGORY_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

<<<<<<< HEAD
app.get('/Kitap/Edebiyat', (req, res) => {
=======
router.get('/books/literature', (req, res) => {
>>>>>>> 12 requests done
  let { price } = req.query
  fs.readFile(CATEGORY_2_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    const categories = JSON.parse(data);
<<<<<<< HEAD
    let filteredCategory = categories.Books.map(book => {
      if (book.price < price.upLimit && book.price > price.downLimit) {
        return book
      }
    })
    res.json(filteredCategory)
  });
});


exports.module = router
=======
    let filteredCategory = []
    if (price !== undefined) {
      let prices = price.split(",")
      filteredCategory = categories.Books.filter(book => {
        let price = book.price * ((100 - book.discount) / 100)
        return (price > prices[0] && price < prices[1])
      })
      res.json({ filteredCategory })
    } else res.json({ ...categories.Books })
  });
});

module.exports = router
>>>>>>> 12 requests done
