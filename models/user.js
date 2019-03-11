'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName:  {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

userSchema.index({username: 1, userId: 1}, {unique:true}); 

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

userSchema.methods.validatePassword = function(incomingPassword){
  return bcrypt.compare(incomingPassword, this.password); 
};

userSchema.statics.hashPassword = function(incomingPassword){
  const digest = bcrypt.hash(incomingPassword, 10); 
  return digest;
};

const User = mongoose.model('User', userSchema);

module.exports = User;