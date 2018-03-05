const express = require('express');
const router = express.Router();

// Handles the inital serving of our Angular application
router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;
