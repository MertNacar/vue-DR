var express = require("express");
const db = require("../database/models/index")

var router = express.Router();

router.get('/login', async (req, res) => {
  try {
    let { email, password } = req.query
    const user = await db.user.findOne({ email, password })
    console.log('user', user)
    const login = user != null
    res.json({ err: !login })
  } catch { }
});

router.post('/signup', async (req, res) => {
  try {
    const user = await db.user.findOne({ email: req.body.email })
    console.log('users', user)
    if (user != null) {
      res.json({ err: true, message: "Bu email ile kayıtlı kullanıcı bulunmaktadır." })
    } else {
      db.user.create({ ...req.body })
      res.json({ err: false, message: "Kaydınız başarıyla oluşturulmuştur." })
    }
  } catch { }
});

module.exports = router