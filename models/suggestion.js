'use strict';

const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  suggestion: { type: String, required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

//// Customize output for `res.json(data)`, `console.log(data)` etc.
suggestionSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v; //delete _v
  }
  
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema); 

module.exports = Suggestion;