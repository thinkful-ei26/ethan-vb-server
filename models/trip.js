'use strict';

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: String,
  selectedOptions: [{ type: String, required: true }],
  duration: { type: String, required: true },
  suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion'}],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

tripSchema.set('timestamps', true);

tripSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;