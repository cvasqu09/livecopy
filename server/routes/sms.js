const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../models/user');

router.post('/', function (req, res, next) {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'Internal service error',
        message: 'Error occurred while sending SMS to contacts'
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: 'User not found',
        message: 'The provided user could not be found'
      });
    }

    try {
    	sendNotificationText(user);
    } catch (e) {
    	return res.status(500).json({
    		title: e.title,
    		message: e.message
    	});
    }
    // var phoneNumbers = user.ICENumbers;
    // for (var number in phoneNumbers) {
    // 	sendNotificationText(number.number, number.provider);
    // }

    res.status(200).json({
    	title: 'Success',
    	message: 'Message sent to contacts'
    });
  });
});

/* Sends a text messsage to the number provided in the user_info object. user_info is expected
   to have information containing info about location, date, time, and phone number. */
function sendNotificationText (user_info) {
  console.log('Sending texts to: ' + user_info.ICENumbers);
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

  user_info.ICENumbers.forEach(function (number) {
    console.log(number);
    console.log(number.provider);
    phoneProviderDomain = providerDomain(number.provider);
    // Information about our message
    var options = {
  	  from: `"Live+ App" <${process.env.LIVE_EMAIL}>`,
  	  to: `${number.phoneNumber}@${phoneProviderDomain}`, // Replace with phone number / provider, Have a check for the provider domain
  	  subject: 'Did I make it?',
  	  text: 'Perhaps' // Change message to contain details about event
    };

    if (number.confirmed)
    // Send message with the options above
    {
      transporter.sendMail(options, (error, info) => {
    	  if (error) {
    	    throw { title: 'SMS error', message: 'Error occurred while sending an SMS' };
    	  }
    	  console.log('The message was sent!');
    	  console.log(info);
      });
    } else {
      throw { title: 'Unconfirmed number', message: 'The provided phone number has not confirmed to be an ICE contact' };
    }
  });
}

/* Returns the domain of the provider that is passed in. The provider is expected to be one
	 of the strings that are in the case statements. */
function providerDomain (provider) {
  var domain = null;
  switch (provider) {
  case 'sprint':
    domain = 'messaging.sprintpcs.com';
    break;
  case 'tmobile':
    domain = 'tmomail.net';
    break;
  case 'verizon':
    domain = 'vtext.com';
    break;
  case 'att':
    domain = 'txt.att.net';
    break;
  default:
    break;
  }
  if (domain == null) {
  	throw new ReferenceError(`No supported phone provider: ${provider} found`);
  }
  return domain;
}

module.exports = router;
