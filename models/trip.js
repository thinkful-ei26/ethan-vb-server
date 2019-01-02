'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  selectedOptions: [String],
  duration: String,
});

schema.set('timestamps', true);

schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Trip', schema);