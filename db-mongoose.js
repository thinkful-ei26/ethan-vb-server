'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { MONGODB_URI } = require('./config');

const Trip = require('./models/trip');

const {trips} = require('./data/seed-trip');

function dbConnect(url = MONGODB_URI) {
  // console.log(DATABASE_URL);
  return mongoose.connect(url)
    .catch(err => {
      console.error('Mongoose failed to connect');
      console.error(err);
    });
}

function dbDisconnect() {
  return mongoose.disconnect();
}

function dbGet() {
  return mongoose;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};
