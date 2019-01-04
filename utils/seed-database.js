'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Trip = require('../models/trip');

const {trips} = require('../data/trip-data');

console.log(MONGODB_URI);

mongoose.connect( MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('deleting');
    return Promise.all([
      Trip.deleteMany()
    ]);
  })
  .then(() => {
    console.log('seeding');
    return Promise.all([
      Trip.insertMany(trips)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });


