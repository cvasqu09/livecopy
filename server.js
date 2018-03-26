const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:3000/LiveDB`);

// API file for interacting with MongoDB
const api = require('./server/routes/api');
const eventsRoutes = require('./server/routes/events');
const userRoutes = require('./server/routes/users');
const smsRoutes = require('./server/routes/sms');
const appRoutes = require('./server/routes/app');

// Parser for incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Allows for cross origin resource sharing since our Mongo may or may not be one the same serving machine
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows for requests from any domain.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Initial Angular application route
app.use('/', appRoutes);

// API locations
app.use('/api/users', userRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api', api);

app.all('*', function (req, res) {
  res.redirect('/'); // Redirect to main screen if invalid path given
});

// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
