const express = require('express');
const router = express.Router();
const authenticate = require('../authentication/authenticate');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
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
