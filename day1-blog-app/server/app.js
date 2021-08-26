global.express = require('express');
const app = express();
global.session = require('express-session');
const mustacheExpress = require('mustache-express');
require('dotenv').config();
global.authenticate = require('./authentication/authenticate');
const pgp = require('pg-promise')();
const connectionString = process.env.DB_CONNECT;
global.db = pgp(connectionString);
global.bcrypt = require('bcryptjs');
const postsRouter = require('./routers/posts');
const usersRouter = require('./routers/users');
const PORT = 3000;

// set express to parse body
app.use(express.urlencoded({ extended: true }));

// set session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
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
