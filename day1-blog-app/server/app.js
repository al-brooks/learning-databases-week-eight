const PORT = 3000;
// npm install express
const express = require('express');
const app = express();
// npm install session-express
const session = require('express-session');
// npm install mustache - express
const mustacheExpress = require('mustache-express');
// npm install pg-promise
const pgp = require('pg-promise')();
// set connection for pg-promise object
const connectionString =
  'postgres://otzxnfsj:DvGvZk9BrTYjSXmD9XFf6GT5VAlk69U-@chunee.db.elephantsql.com/otzxnfsj';
// set database object
const db = pgp(connectionString);

// set express to parse body
app.use(express.urlencoded({ extended: true }));

// set session middleware
app.use(
  session({
    secret: 'FreeFoodForSecretKey',
    saveUninitialized: true,
    resave: true
  })
);

// set mustache for template engine
app.engine('mustache', mustacheExpress());
app.set('views', './mustache-templates');
app.set('view engine', 'mustache');

// get all posts
app.get('/', (req, res) => {
  db.any(
    'SELECT title, body, post_id, user_id, date_updated FROM blog_posts ORDER BY date_updated DESC'
  ).then((posts) => {
    res.render('index', { posts: posts });
  });
});

app.post('/post-detail', (req, res) => {
  const post_id = parseInt(req.body.post_id);

  db.one(
    'SELECT title, body, post_id, user_id, date_updated FROM blog_posts WHERE post_id=$1',
    [post_id]
  ).then((post) => {
    res.render('post-detail', { post: post });
  });
});

app.post('/update-post', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const post_id = parseInt(req.body.post_id);

  db.none(
    'UPDATE blog_posts SET title=$1, body=$2, date_updated=current_timestamp WHERE post_id=$3',
    [title, body, post_id]
  ).then(() => {
    res.redirect('/');
  });
});

app.post('/add-post', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  //   const is_published = true;
  //   const user_id = 1;

  db.none(
    'INSERT INTO blog_posts(title, body, is_published, user_id) VALUES($1, $2, $3, $4)',
    [title, body, true, 1]
  ).then(() => {
    res.redirect('/');
  });
});

app.post('/delete-post', (req, res) => {
  const post_id = parseInt(req.body.post_id);

  db.none('DELETE FROM blog_posts WHERE post_id=$1', [post_id]).then(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log('Server is running...');
});
