'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {TEST_DATABASE_URL} = require('../config');
const {dbConnect, dbDisconnect} = require('../db-mongoose');
// const {dbConnect, dbDisconnect} = require('../db-knex');

const app = require('../index');
// const server = require('../index');
const Trip = require('../models/trip');
const {trips} = require('../data/trip-data');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
  return dbConnect(TEST_DATABASE_URL, {useNewUrlParser: true})
    .then(Trip.deleteMany());
});

beforeEach(function(){
  return Promise.all([
    Trip.insertMany(trips)
  ]);
});

afterEach(function(){
  return Promise.all([
    Trip.deleteMany()
  ]);
});

after(function() {
  return dbDisconnect();
});

describe('Mocha and Chai', function() {
  it('should be properly setup', function() {
    expect(true).to.be.true;
  });
});

describe('GET all trips', function(){
  it('should return an array of trip objects with the correct keys', function(){
    // console.log(app);
    // console.log(server);
    let res;
    return chai
      .request(app)
      .get('/api/trips')
      .then(response => {
        res = response;
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(3);
        res.body.forEach(function (item) {
          expect(item).to.be.a('object');
          expect(item).to.have.all.keys('id', 'name', 'createdAt', 'selectedOptions', 'duration', 'suggestions', 'updatedAt');
        });
      });
  });
});
