'use strict';

//load dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define scheme for users
const userSchema = mongoose.Schema({
	email: String,
	password: String
});

userSchema.statics.hashPassword = (plainPassword) => {
	return bcrypt.hash(plainPassword, 10);
};
// create user model using scheme
const User = mongoose.model('User', userSchema);

module.exports = User;