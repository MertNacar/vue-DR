const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();

const USER_DATA_FILE = path.join(__dirname, '../datas/login-data.json');

router.get('/login', (req, res) => {
  let { email, password } = req.query
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);
    let login = false
    users.map((user) => {
      if (user.email === email && user.password === password) {
        login = true
      }
    });
    res.json({ err: !login })
  });
});

router.post('/signup', (req, res) => {
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);
    const newUser = { ...req.body }; // email password name surname
    let userExists = false
    users.map((user) => {
      if (user.email === newUser.email) {
        userExists = true
      }
    });
    if (userExists) {
      res.json({ err: true, message: "Bu email ile kayıtlı kullanıcı bulunmaktadır." })
    } else {
      newID = users[users.length - 1].id + 1
      users.push({ id: newID, ...newUser });
      fs.writeFile(USER_DATA_FILE, JSON.stringify(users, null, 2), () => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json({ err: false, message: "Kaydınız başarıyla oluşturulmuştur." })
      });
    }
  });
});

module.exports = router
