
const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


const CATEGORY_DATA_FILE = path.join(__dirname, '../datas/category-data.json');
const CATEGORY_2_DATA_FILE = path.join(__dirname, '../datas/category-2-data.json');

router.get('/books', (req, res) => {
  fs.readFile(CATEGORY_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


router.get('/books/literature/all', (req, res) => {
  fs.readFile(CATEGORY_2_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

router.get('/books/literature', (req, res) => {
  let { price } = req.query
  fs.readFile(CATEGORY_2_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    const categories = JSON.parse(data);
    let filteredCategory = []
    if (price !== "") {
      let prices = price.split(",")
      filteredCategory = categories.Books.filter(book => {
        let price = book.price * ((100 - book.discount) / 100)
        return (price > prices[0] && price < prices[1])
      })
      res.json({ Books: [...filteredCategory] })
    } else res.json({ Books: [...categories.Books] })
  });
});

module.exports = router
