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

module.exports = router;
