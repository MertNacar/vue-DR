
const fs = require('fs');
const path = require('path');
var express = require("express");

var router = express.Router();


const HOME_DATA_FILE = path.join(__dirname, '../datas/home-data.json');
const COMMENT_DATA_FILE = path.join(__dirname, '../datas/comments.json');
const MENU_DATA_FILE = path.join(__dirname, '../datas/menu-data.json');

router.get('', (req, res) => {
  fs.readFile(HOME_DATA_FILE, (err, data) => {
    const homepage = JSON.parse(data);
    res.json({ ...homepage })
  });
});

router.get('/menu', (req, res) => {
  fs.readFile(MENU_DATA_FILE, (err, data) => {
    const menu = JSON.parse(data);
    res.json({ ...menu })
  });
});

router.get('/book/comments', (req, res) => {
  fs.readFile(COMMENT_DATA_FILE, (err, data) => {
    let comments = JSON.parse(data);
    const id = req.query.id
    let book = comments.filter(item => item.id === id)
    return res.json({ comments: book.length != 0 ? book[0].comments : [] })
  });
});

router.post('/book/comment/add', (req, res) => {
  fs.readFile(COMMENT_DATA_FILE, (err, data) => {
    let comments = JSON.parse(data);
    const newComment = { ...req.body }; //book id  - title  - description
    let commentExists = false;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;
    comments.map((item) => {
      if (item.id === newComment.id) {
        item.comments.push({ id: item.comments.length + 1, title: newComment.title, description: newComment.description, date: today })
        commentExists = true;
      }
    });
    if (!commentExists) {
      comments.push({
        id: newComment.id,
        comments: [{ id: 1, title: newComment.title, description: newComment.description, date: today }]
      });
    }
    fs.writeFile(COMMENT_DATA_FILE, JSON.stringify(comments, null, 2), () => {
      res.setHeader('Cache-Control', 'no-cache');
      let book = comments.filter(item => item.id === newComment.id)
      console.log('book', book)
      return res.json({ comments: book[0].comments })
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
