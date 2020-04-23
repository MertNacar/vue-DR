
const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


const PAYMENT_FILE = path.join(__dirname, '../datas/payment.json');

router.post('', (req, res) => {
  fs.readFile(PAYMENT_FILE, (err, data) => {
    const payments = JSON.parse(data);
    payments.pays.push(req.body);
    fs.writeFile(PAYMENT_FILE, JSON.stringify(payments, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json({ err: false });
    });
  });
});

module.exports = router
