
const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


<<<<<<< HEAD
const HOME_DATA_FILE = path.join(__dirname, 'src/datas/home-data.json');

router.get('', (req, res) => {
  fs.readFile(HOME_DATA_FILE, (err, data) => {
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
const HOME_DATA_FILE = path.join(__dirname, '../datas/home-data.json');
const COMMENT_DATA_FILE = path.join(__dirname, '../datas/comments.json');

router.get('', (req, res) => {
  fs.readFile(HOME_DATA_FILE, (err, data) => {
    const homepage = JSON.parse(data);
    res.json({ ...homepage })
  });
});

router.post('/book/comment/add', (req, res) => {
  fs.readFile(COMMENT_DATA_FILE, (err, data) => {
    let comments = JSON.parse(data);
    const newComment = { ...req.body }; //book id  - title  - description
    let commentExists = false;
    comments.map((item) => {
      if (item.id === newComment.id) {
        item.comments.push({ id: item.comments.length + 1, title: newComment.title, description: newComment.description })
        commentExists = true;
      }
    });
    if (!commentExists) {
      comments.push({
        id: newComment.id,
        comments: [{ id: 1, title: newComment.title, description: newComment.description }]
      });
    }
    fs.writeFile(COMMENT_DATA_FILE, JSON.stringify(comments, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

router.delete('/book/comment/delete', (req, res) => {
  fs.readFile(COMMENT_DATA_FILE, (err, data) => {
    let comments = JSON.parse(data);
    let { id, commentID } = req.query
    let remainComments = []
    comments.map((item) => {
      if (item.id === id) {
        remainComments = item.comments.filter(comment => { return comment.id != commentID })
        item.comments = remainComments
      }
    });
    fs.writeFile(COMMENT_DATA_FILE, JSON.stringify(comments, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

router.get('/search', (req, res) => {
  fs.readFile(HOME_DATA_FILE, (err, data) => {
    const home = JSON.parse(data);
    const sentence = req.query.sentence
    let result = [];
    result = home.Book.filter((item) => {
      return item.title.includes(sentence)
    })
    res.json({ result })
  });
});


module.exports = router
>>>>>>> 12 requests done
