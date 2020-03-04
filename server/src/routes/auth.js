const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();

<<<<<<< HEAD
const USER_DATA_FILE = path.join(__dirname, 'src/datas/cart-data.json');

router.get('/login', (req, res) => {
  let { email, password } = req.body
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);
    users.map((user) => {
      if (user.email === email && user.password === password) {
        res.json({ err: false })
      } else res.json({ err: true })
    });
=======
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
>>>>>>> 12 requests done
  });
});

router.post('/signup', (req, res) => {
  fs.readFile(USER_DATA_FILE, (err, data) => {
<<<<<<< HEAD
    let { email, password } = req.body
    const users = JSON.parse(data);
    const newUser = { email, password };
    users.map((user) => {
      if (user.email === newUser.email) {
        res.json({ err: true })
      } else {
        users.push(newUser);
        res.json({ err: false })
      }
    });
  });
});
=======
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
        res.json({ err: false, message: "Kullanıcı başarıyla eklenmiştir." })
      });
    }
  });
});

module.exports = router
>>>>>>> 12 requests done
