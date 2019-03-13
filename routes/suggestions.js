'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');
const Suggestion = require('../models/suggestion');

router.post('/:id', (req, res, next) => {
  const { suggestion } = req.body;
  const tripId = req.params.id;
  const newSuggestion = { suggestion, tripId: tripId };

  Suggestion.create(newSuggestion)
    .then(suggestion => {
      return Trip.findByIdAndUpdate( {_id: tripId}, { $push: {suggestions: suggestion.id} }, {new: true})
        .populate({
          path: 'suggestions',
          // populate: { path: 'userId' }
        })
        .populate('userId');
    })
    .then(trip => {
      return res.status(201).location(`http://${req.headers.host}/posts/${trip.id}`).json(trip);
    })
    .catch(err => next(err));
});


module.exports = router;