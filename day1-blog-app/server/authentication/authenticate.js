const authenticate = (req, res, next) => {
  if (req.session) {
    if (req.session.user_id) {
      next();
    } else {
      res.render('login-signup', { message: 'Log in to continue' });
    }
  } else {
    res.render('login-signup', { message: 'Log in to continue' });
  }
};

module.exports = authenticate;
