'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Trip = require('../models/trip');
const Suggestion = require('../models/suggestion');
const User = require('../models/user');

const {trips, suggestions, users} = require('../data/data');

console.log(MONGODB_URI);

mongoose.connect( MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('deleting');
    return Promise.all([
      Trip.deleteMany(),
      User.deleteMany(),
      Suggestion.deleteMany()
    ]);
  })
  .then(() => {
    console.log('seeding');
    return Promise.all([
      Trip.insertMany(trips),
      User.insertMany(users),
      Suggestion.insertMany(suggestions)
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


