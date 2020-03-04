const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


<<<<<<< HEAD
const CART_DATA_FILE = path.join(__dirname, 'src/datas/cart-data.json');
=======
const CART_DATA_FILE = path.join(__dirname, '../datas/cart-data.json');
>>>>>>> 12 requests done


router.get('', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

<<<<<<< HEAD
router.post('', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    const newCartProduct = { id: req.body.id, title: req.body.title, description: req.body.description, price: req.body.price, quantity: 1 };
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity++;
=======
router.post('/add', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    const newCartProduct = { ...req.body };//id source img rate title author cover publisher publisherSource price discount quantity
    let cartProductExists = false;
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity = newCartProduct.quantity;
>>>>>>> 12 requests done
        cartProductExists = true;
      }
    });
    if (!cartProductExists) cartProducts.push(newCartProduct);
<<<<<<< HEAD
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
=======
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 2), () => {
>>>>>>> 12 requests done
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
    });
  });
});

<<<<<<< HEAD
router.post('/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map((cartProduct) => {
      if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartProducts.findIndex(cartProduct => cartProduct.id === req.body.id);
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cartProducts);
=======
router.delete('/delete', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    let remainProducts = cartProducts.filter(cartProduct => {
      return cartProduct.id !== req.query.id
    })
    fs.writeFile(CART_DATA_FILE, JSON.stringify(remainProducts, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(remainProducts);
>>>>>>> 12 requests done
    });
  });
});

<<<<<<< HEAD
router.post('/delete/all', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let emptyCart = [];
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
=======
router.delete('/delete/all', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let emptyCart = [];
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 2), () => {
>>>>>>> 12 requests done
      res.json(emptyCart);
    });
  });
});

<<<<<<< HEAD
exports.module = router
=======
module.exports = router
>>>>>>> 12 requests done
