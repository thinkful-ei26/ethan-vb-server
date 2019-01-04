'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
  Trip.find({})
    .then(results => {
      // console.log(res.json(results));
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const {name, duration, selectedOptions} = req.body;
  const newTrip = {name, duration, selectedOptions};
  console.log(newTrip);

  Trip.create(newTrip)
    .then(result => {
      console.log(result);
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const {suggestion} = req.body;
  // console.log(req.body);
  // const newSuggestion = suggestion;
  console.log(suggestion);
  // console.log(newSuggestion);

  Trip.findOneAndUpdate({_id: id}, { $push: {suggestions: suggestion} }, {new: true})
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;