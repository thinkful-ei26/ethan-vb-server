'use strict';

const trips = [
  {
    _id: '111111111111111111111101',
    name: 'tom',
    selectedOptions: ['skiing', 'breweries'],
    duration: 9,
    suggestions: ['denver']
  },

  {
    _id: '111111111111111111111102',
    name: 'frank',
    selectedOptions: ['beaches'],
    duration: 2,
    suggestions: ['san diego', 'cuba']
  },
  
  {
    _id: '111111111111111111111103',
    name: 'fred',
    selectedOptions: ['city'],
    duration: 9,
    suggestions: []
  }
];

module.exports = {trips};
