'use strict';

//load mongoose module
const mongoose = require('mongoose');

// define scheme for users
const userSchema = mongoose.Schema({
    username: String,
    pw: String,
    email: String
});

// create user model using scheme
const User = mongoose.model('User', userSchema);

module.exports = User;