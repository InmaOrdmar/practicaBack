'use strict';

//load mongoose module
const mongoose = require('mongoose');

// define scheme for users
const userSchema = mongoose.Schema({
	email: String,
	password: String
});

// create user model using scheme
const User = mongoose.model('User', userSchema);

module.exports = User;