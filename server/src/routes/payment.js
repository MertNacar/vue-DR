
var express = require("express");
const db = require("../database/models/index")

var router = express.Router();

router.post('', async (req, res) => {
  try {
    await db.payment.create(req.body)
    res.json({ err: false });
  } catch{ }
});

module.exports = router
