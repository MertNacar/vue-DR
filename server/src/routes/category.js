
var express = require("express");
const db = require("../database/models/index")
var router = express.Router();

router.get('/books', async (req, res) => {
  try {
    console.log('hey')
    let categories = await db.category.findOne()
    console.log('categories', categories)
    res.json({ ...categories._doc });
  } catch { }
});

router.get('/books/literature/all', async (req, res) => {
  try {
    let literatures = await db.literature.findOne()
    res.json({ ...literatures._doc });
  } catch { }
});

router.get('/books/literature', async (req, res) => {
  try {
    let { price } = req.query
    const categories = await db.literature.findOne()
    if (price !== "") {
      let prices = price.split(",")
      let filtered = categories._doc.Books.filter(book => {
        let price = book.price * ((100 - book.discount) / 100)
        return (price > prices[0] && price < prices[1])
      })
      res.json({ Books: [...filtered] })
    } else res.json({ Books: [...categories._doc.Books] })
  } catch { }
});

module.exports = router
