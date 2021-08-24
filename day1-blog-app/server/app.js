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
  db.any('SELECT title, body FROM blog_posts').then((posts) => {
    res.render('index', { posts: posts });
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

app.listen(PORT, () => {
  console.log('Server is running...');
});
