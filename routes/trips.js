'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');
const Suggestion = require('../models/suggestion');


//GET ALL TRIPS
router.get('/', (req, res, next) => {
  Trip.find({})
    .populate('suggestions')
    .populate('userId')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//GET ALL TRIPS FOR USER
router.get('/my-trips', (req, res, next) => {
  const userId = req.user.id;
  // console.log(userId);
  Trip.find({userId: userId})
    .populate('suggestions')
    // .populate('userId')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


//CREATE A TRIP
router.post('/', (req, res, next) => {
  const userId = req.user.id;
  const {name, duration, selectedOptions} = req.body;
  const newTrip = {name, duration, selectedOptions, userId};

  Trip.create(newTrip)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

//ADD A SUGGESTION
// router.put('/:id', (req, res, next) => {
//   const id = req.params.id;
//   const userId = req.user.id;
//   const {suggestion} = req.body;
//   suggestion.userId = userId;

//   Trip.findOneAndUpdate({_id: id}, { $push: {suggestions: suggestion} }, {new: true})
//     .then(result => {
//       if (result) {
//         res.json(result);
//       } else {
//         next();
//       }
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
