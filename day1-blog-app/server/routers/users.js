const express = require('express');
const router = express.Router();
const authenticate = require('../authentication/authenticate');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/:userid', (req, res) => {
  const user_id = req.params.userid;

  db.one(
    'SELECT user_id, user_name, user_email FROM blog_users WHERE user_id = $1',
    [user_id]
  )
    .then((user) => {
      res.render('useraccount', { user: user });
    })
    .catch((error) => {
      res.send('An error occurred');
    });
});

// passes |
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.one(
    'SELECT user_id, user_name, user_password FROM blog_users WHERE user_name = $1',
    [username]
  )
    .then((user) => {
      bcrypt.compare(password, user.user_password, function (err, result) {
        if (result) {
          if (req.session) {
            req.session.user_id = user.user_id;
          }
          res.redirect(`/users/${user.user_id}`);
        } else {
          res.send('Not Authenticated');
        }
      });
    })
    .catch((error) => {
      res.send('User Not Found');
    });
});

// passes |
router.post('/signup', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const user_name = req.body.username;
  const user_email = req.body.email;
  const user_password = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    if (!err) {
      bcrypt.hash(user_password, salt, function (err, hash) {
        if (!err) {
          db.none(
            'INSERT INTO blog_users(first_name, last_name, user_name, user_email, user_password) VALUES($1, $2, $3, $4, $5)',
            [first_name, last_name, user_name, user_email, hash]
          ).then(() => {
            console.log('User has been added to db');
            res.send('Success');
          });
        } else {
          res.send('Error occurred');
        }
      });
    } else {
      res.send('Error occurred');
    }
  });
});

module.exports = router;
