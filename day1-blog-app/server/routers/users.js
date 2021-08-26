const express = require('express');
const router = express.Router();
const authenticate = require('../authentication/authenticate');

router.get('/', (req, res) => {
  res.send('Request has successfully gone through.');
});

module.exports = router;
