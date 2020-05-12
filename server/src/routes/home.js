
var express = require("express");
const db = require("../database/models/index")

var router = express.Router();

router.get('', async (req, res) => {
  try {
    const homepage = await db.book.findOne()
    res.json({ ...homepage._doc })
  } catch { }
});

router.get('/menu', async (req, res) => {
  try {
    const menu = await db.menu.find()
    res.json({ ...menu })
  } catch { }
});

router.get('/book/comments', async (req, res) => {
  try {
    const id = req.query.id
    const book = await db.comment.findOne({ id })
    return res.json({ comments: book.length != 0 ? book.comments : [] })
  } catch { }
});

router.post('/book/comment/add', async (req, res) => {
  try {
    const newComment = { ...req.body }; //book id  - title  - description
    let book = await db.comment.findOne({ id: newComment.id })
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    console.log('comments', book)
    today = dd + '.' + mm + '.' + yyyy;
    if (book != null) {
      db.comment.updateOne(
        { id: newComment.id },
        { $push: { "comments": { id: book.comments.length + 1, title: newComment.title, description: newComment.description, date: today } } }
      );
    }
    else {
      await db.comment.updateOne({
        id: newComment.id,
        comments: [{ id: 1, title: newComment.title, description: newComment.description, date: today }]
      });
    }
    added = await db.comment.findOne({ id: newComment.id })
    return res.json({ comments: added.comments })
  } catch { }
});


router.delete('/book/comment/delete', async (req, res) => {
  try {

    let { id, commentID } = req.query
    let remainComments = []
    let comments = await db.comment.findOne({ id })
    remainComments = comments.comments.filter(comment => { return comment.id != commentID })
    await db.comment.updateOne({ id }, {
      id,
      comments: remainComments
    })
    comments = await db.comment.findOne({ id })
    res.json(comments);
  } catch { }
});

module.exports = router
