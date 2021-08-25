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
global.db = pgp(connectionString);
const postsRouter = require('./routers/posts');
const usersRouter = require('./routers/users');

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

// set routers
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// set mustache for template engine
app.engine('mustache', mustacheExpress());
app.set('views', './templates');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Server is running...');
});
