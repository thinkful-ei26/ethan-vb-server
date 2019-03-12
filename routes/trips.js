'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');


//GET ALL TRIPS
router.get('/', (req, res, next) => {
  Trip.find({})
    .populate({
      path: 'suggestions',
      populate: {path: 'userId'}
    })
    .populate('userId')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


//CREATE A TRIP
router.post('/', (req, res, next) => {
  const {name, duration, selectedOptions} = req.body;
  const newTrip = {name, duration, selectedOptions};

  Trip.create(newTrip)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

//ADD A SUGGESTION
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const {suggestion} = req.body;

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
