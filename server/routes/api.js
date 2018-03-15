const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('Use an endpoint such as /events or /users to use the API.');
});

module.exports = router;
