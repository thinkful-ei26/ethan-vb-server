'use strict';

const express = require('express');
const passport = require('passport');

const jwtStrategy = require('../passport/jwt');
const options = {session: false, failWithError: true};
const jwtAuth = passport.authenticate('jwt', options);
passport.use(jwtStrategy);

const User = require('../models/user');

const router = express.Router();

function missingField(requiredFields, body){
  return requiredFields.find(field => !(field in body));
}

function nonStringField(stringFields, body){
  return stringFields.find(
    field => field in body && typeof body[field] !== 'string'
  );
}

function nonTrimmedField(explicityTrimmedFields, body){
  return explicityTrimmedFields.find(
    field => body[field].trim() !== body[field]
  );
}

function tooSmallField(sizedFields, body){
  return Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            body[field].trim().length < sizedFields[field].min
  );
}

function tooLargeField(sizedFields, body){
  return Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            body[field].trim().length > sizedFields[field].max
  );
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


router.post('/', (req,res,next) => {
  //First do validation (dont trust client)
  const requiredFields = ['registerUsername', 'password', 'firstName', 'lastName'];

  let missing= missingField(requiredFields, req.body);

  if (missing) {
    const err = {
      message: `Missing '${missing}' in request body`,
      reason: 'ValidationError',
      location: `${missing}`,
      status: 422
    };
    return next(err);
  }

  const stringFields = ['registerUsername', 'password', 'firstName', 'lastName'];
  let notString= nonStringField(stringFields, req.body);

  if (notString) {
    const err = {
      message: 'Incorrect field type: expected string',
      reason: 'ValidationError',
      location: notString,
      status: 422
    };
    return next(err);
  }

  // If the username and password aren't trimmed we give an error.  Users might expect that these will work without trimming. We need to reject such values explicitly so the users know what's happening, rather than silently trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used to log in, so it's less of a problem.
  const explicityTrimmedFields = ['registerUsername', 'password'];
  let notTrimmed = nonTrimmedField(explicityTrimmedFields, req.body);

  if (notTrimmed) {
    const err = {
      message: 'Cannot start or end with whitespace',
      reason: 'ValidationError',
      location: notTrimmed,
      status: 422
    };
    return next(err);
  }

  const sizedFields = {
    registerUsername: {
      min: 1
    },
    password: {
      min: 6,
      // bcrypt truncates after 72 characters, so let's not give the illusion of security by storing extra (unused) info
      max: 72
    }
  };

  let tooSmall = tooSmallField(sizedFields, req.body);
  let tooLarge = tooLargeField(sizedFields, req.body);

  if (tooSmall || tooLarge) {
    const message = tooSmall
      ? `Must be at least ${sizedFields[tooSmall]
        .min} characters long`
      : `Must be at most ${sizedFields[tooLarge]
        .max} characters long`;

    const err = {
      message: message,
      reason: 'ValidationError',
      location: tooSmall || tooLarge,
      status: 422
    };
    return next(err);
  }

  // // Username and password were validated as pre-trimmed, but we should trim the first and last name
  let {firstName, lastName, registerUsername, password} = req.body;
  firstName = firstName.trim();
  firstName = formatName(firstName);
  lastName = lastName.trim();
  lastName = formatName(lastName);

  //capitalize first letter of firt and first letter of last
  firstName = capitalizeFirstLetter(firstName);
  lastName = capitalizeFirstLetter(lastName);

 
  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username: registerUsername,
        password: digest,
        firstName,
        lastName,
      };
      return User.create(newUser);
    })
    .then(user => {
      // The endpoint creates a new user in the database and responds with a 201 status, a location header and a JSON representation of the user without the password.
      return res.status(201).json(user);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = {
          message: 'This username is already taken. Please try again!',
          reason: 'ValidationError',
          location: 'registerUsername',
          status: 422
        };
      }
      next(err);
    });
});