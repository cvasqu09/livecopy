const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('../models/event');

/* Routes in this file will be prefixed by <host_name>/api/events */

/* Route to retrieve all events */
router.get('/', function (req, res, next) {
  Event.find(function (err, events) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while getting event'
      });
    }
    res.status(200).json(events);
  });
});

/* Retrieve a single event by id. The body-parser library will extract the id
   from the end of the url so that we can use it when searching Mongo collection */
router.get('/:_id', function (req, res, next) {
  Event.findById(req.params._id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: 'Error occurred retrieving id. Be sure to use a valid 24 hex string.',
        message: err
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No event found'
      });
    }

    res.status(200).json(event);
  });
});

/* Used to create a new event */
router.post('/', function (req, res, next) {
  var event = new Event(req.body);

  event.save(function (err, result) {
    if (err) {
      return res.status(400).json({
        title: '400 Error',
        error: err,
        message: 'Bad request sent'
      });
    }

    res.status(201).json(result);
  });
});

/* Used to edit an event with an id */
router.patch('/:_id', function (req, res, next) {
  Event.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true }, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while patching event'
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'Event not found'
      });
    }

    res.status(200).json(event);
  });
});

/* Used to delete an event with a given id */
router.delete('/:_id', function (req, res, next) {
  Event.findById(req.params._id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while trying to delete event'
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        error: 'Event with the given ID not found.'
      });
    }

    Event.findByIdAndRemove({ _id: req.params._id }, function (err, deletedEvent) {
      if (err) {
        return res.status(500).json({
          title: '500 Internal Server Error',
          error: err,
          message: 'Error occurred while trying to delete event'
        });
      }

      res.status(200).json(deletedEvent);
    });
  });
});

module.exports = router;
