const PORT = 3000;
// npm install express
const express = require('express');
const app = express();
// npm install session-express
const session = require('express-session');
// npm install mustache - express
const mustacheExpress = require('mustache-express');

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

app.listen(PORT, () => {
  console.log('Server is running...');
});
