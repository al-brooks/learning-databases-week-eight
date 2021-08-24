const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Request has successfully gone through.');
});

module.exports = router;
