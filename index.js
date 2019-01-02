'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
const mongoose = require('mongoose');

// const {dbConnect} = require('./db-knex');

const app = express();

const Trip = require('./models/trip');

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());

// const trips = [
//   {
//     user: 'tom',
//     selectedOptions: ['skiing', 'breweries'],
//     duration: 9
//   },

//   {
//     user: 'frank',
//     selectedOptions: ['beaches'],
//     duration: 9
//   },
  
//   {
//     user: 'tom',
//     selectedOptions: ['city'],
//     duration: 9
//   }
// ];

// app.get('/api/trips', (req, res) => {
//   res.json({trips});
// });

app.get('/api/trips', (req, res, next) => {
  Trip.find({})
    .then(results => {
      // console.log(res.json(results));
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

// app.post('/api/trips', (req, res) =>{
  
//   console.log(req.body);

//   // const name = req.body.name;

//   const newTrip = req.body;

//   trips = [...trips, newTrip];

//   console.log(trips);
//   res.status(201).json({trips});
// });

app.post('/api/trips', (req, res, next) =>{
  // const newTrip  = req.body;
  console.log(req.body);
  const {name, duration} = req.body;
  const newTrip = {name, duration};

  console.log(name, duration);


  // const newTrip = { trip };



  /***** Never trust users - validate input *****/
  // if (!newTrip) {
  //   const err = new Error('Missing `name` in request body');
  //   err.status = 400;
  //   return next(err);
  // }

  Trip.create(newTrip)
    .then(result => {
      console.log(result);
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
