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
        title: 'Error occurred while retrieving user',
        error: err
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: 'User not found',
        status: 404
      });
    }

    res.status(200).json(user);
  });
});

// Used to create a user
router.post('/', function (req, res, next) {
  var user = new User(req.body);

  user.save(function (err, result) {
  	if (err) {
  		return res.status(400).json({
		  	title: 'Bad request',
        sent: req.body,
		  	error: err,
        status: 400
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
        title: 'Error occurred while patching user',
        error: err
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: 'Error no object found'
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
        title: 'Error occurred while finding user.',
        error: err
      });
    }

    if (user == null) {
    	return res.status(404).json({
    		title: 'Error finding user',
    		error: err
    	});
    }

    User.findByIdAndRemove({ _id: req.params.id }, function (err, deletedUser) {
      if (err) {
        return res.status(500).json({
          title: 'Error while deleting user.',
          error: err
        });
      }

      res.status(200).json(deletedUser);
    });
  });
});

module.exports = router;
