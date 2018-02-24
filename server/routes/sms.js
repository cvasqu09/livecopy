const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../models/user');

router.post('/', function (req, res, next) {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'Error occurred while sending SMS to contacts',
        error: err
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: 'User not found'
      });
    }

    var phoneNumbers = user.ICENumbers;
    for (var number in phoneNumbers) {
    	sendNotificationText(number.number, number.provider);
    }

    res.status(200).json({
    	title: 'Success',
    	message: 'Message sent to contacts'
    });
  });
});

function sendNotificationText (number, provider) {
  // Create the transporter for our message
  var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  secure: false,
	  port: 25,
	  auth: {
	    user: process.env.LIVE_EMAIL,
	    pass: process.env.LIVE_EMAIL_PASS
	  },
	  tls: {
	    rejectUnauthorized: false
	  }
  });

  // Information about our message
  var options = {
	  from: `"Live+ App" <${process.env.LIVE_EMAIL}>`,
	  to: 'cvasqu09@gmail.com', // Replace with phone number / provider, Have a check for the provider domain
	  subject: 'Did I make it?',
	  text: 'Perhaps'
  };

  // Send message
  transporter.sendMail(options, (error, info) => {
	  if (error) {
	    return console.log(error);
	  }
	  console.log('The message was sent!');
	  console.log(info);
  });
}

module.exports = router;
