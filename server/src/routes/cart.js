const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


const CART_DATA_FILE = path.join(__dirname, '../datas/cart-data.json');


router.get('', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

router.post('/add', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    const newCartProduct = { ...req.body };//id source img rate title author cover publisher publisherSource price discount quantity
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity = newCartProduct.quantity;
        cartProductExists = true;
      }
    });
    if (!cartProductExists) cartProducts.push(newCartProduct);
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});

router.delete('/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    let remainProducts = cartProducts.filter(cartProduct => {
      return cartProduct.id !== req.query.id
    })
    fs.writeFile(CART_DATA_FILE, JSON.stringify(remainProducts, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(remainProducts);
    });
  });
});

router.delete('/delete/all', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let emptyCart = [];
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 2), () => {
      res.json(emptyCart);
    });
  });
});

module.exports = router
