const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

/* Routes for handling requests related to users */

// Retrieves user by id
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal server error',
        message: 'Error occurred while retrieving user'
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: '404 Not found',
        message: 'User not found'
      });
    }

    res.status(200).json(user);
  }).populate('eventIds');
});

// Used to create a user
router.post('/', function (req, res, next) {
  var user = new User(req.body);

  user.save(function (err, result) {
  	if (err) {
  		return res.status(400).json({
		  	title: '400 Bad request',
        sent: req.body,
		  	error: err,
        status: 400,
        message: 'Bad request sent'
  		});
  	}

  	res.status(201).json(result);
  });
});

// Used to edit a user
router.patch('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal server error occurred',
        error: 'Error occurred while patching user'
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No user found'
      });
    }

    res.status(200).json(user);
  });
});

// Used to delete a user
router.delete('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal server error',
        error: err,
        message: 'Error occurred while finding user.'
      });
    }

    if (user == null) {
    	return res.status(404).json({
    		title: '404 Error',
    		error: err,
        message: 'Error finding user'
    	});
    }

    User.findByIdAndRemove({ _id: req.params.id }, function (err, deletedUser) {
      if (err) {
        return res.status(500).json({
          title: '500 Internal server error.',
          error: err,
          message: 'Error occurred while deleting user'
        });
      }

      res.status(200).json(deletedUser);
    });
  });
});

module.exports = router;
