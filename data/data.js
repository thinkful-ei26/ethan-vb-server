'use strict';

const trips = [
  {
    _id: '111111111111111111111101',
    name: 'Mountains',
    selectedOptions: ['Skiing', 'Breweries'],
    duration: 9,
    suggestions: ['333333333333333333333301', '333333333333333333333302'],
    userId: '000000000000000000000002'
  },

  {
    _id: '111111111111111111111102',
    name: 'frank',
    selectedOptions: ['Beaches'],
    duration: 2,
    suggestions: ['333333333333333333333303', '333333333333333333333304'],
    userId: '000000000000000000000001'
  },
  
  {
    _id: '111111111111111111111103',
    name: 'fred',
    selectedOptions: ['City'],
    duration: 9,
    suggestions: [],
    userId: '000000000000000000000002'
  }
];

const suggestions = [
  {
    _id: '333333333333333333333301',
    suggestion: 'USA',
    userId: '000000000000000000000002',
    tripId: '111111111111111111111101'
  },
  {
    _id: '333333333333333333333302',
    suggestion: 'San Diego',
    userId: '000000000000000000000002',
    tripId: '111111111111111111111101',
  },
  {
    _id: '333333333333333333333303',
    suggestion: 'Denver',
    userId: '000000000000000000000001',
    tripId: '111111111111111111111102',
  },
  {
    _id: '333333333333333333333304',
    suggestion: 'Chicago',
    tripId: '111111111111111111111102',
  }
];

const users = [
  {
    _id: '000000000000000000000001',
    firstName: 'Ethan',
    lastName: 'Frigon',
    username: 'ethfrig',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
  },
  {
    _id: '000000000000000000000002',
    firstName: 'Steve',
    lastName: 'Anderson',
    username: 'steve',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
  },
  {
    _id: '000000000000000000000003',
    firstName: 'Demo',
    lastName: 'User',
    username: 'demo',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
  }
];

module.exports = { trips, suggestions, users};
