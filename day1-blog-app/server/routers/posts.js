const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.get('/', (req, res) => {
  db.any(
    'SELECT title, body, post_id, user_id, date_updated FROM blog_posts ORDER BY date_updated DESC'
  ).then((posts) => {
    res.render('posts', { posts: posts });
  });
});

router.post('/post-detail', (req, res) => {
  const post_id = parseInt(req.body.post_id);

  db.one(
    'SELECT title, body, post_id, user_id, date_updated FROM blog_posts WHERE post_id=$1',
    [post_id]
  ).then((post) => {
    res.render('post-detail', { post: post });
  });
});

router.post('/update-post', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const post_id = parseInt(req.body.post_id);

  db.none(
    'UPDATE blog_posts SET title=$1, body=$2, date_updated=current_timestamp WHERE post_id=$3',
    [title, body, post_id]
  ).then(() => {
    res.redirect('/posts');
  });
});

router.post('/add-post', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  //   const is_published = true;
  //   const user_id = 1;

  db.none(
    'INSERT INTO blog_posts(title, body, is_published, user_id) VALUES($1, $2, $3, $4)',
    [title, body, true, 1]
  ).then(() => {
    res.redirect('/posts');
  });
});

router.post('/delete-post', (req, res) => {
  const post_id = parseInt(req.body.post_id);

  db.none('DELETE FROM blog_posts WHERE post_id=$1', [post_id]).then(() => {
    res.redirect('/posts');
  });
});

module.exports = router;
