'use strict';

//load dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

// define scheme for users
const userSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
	password: String
});

userSchema.statics.hashPassword = (plainPassword) => {
	return bcrypt.hash(plainPassword, 10);
};
// create user model using scheme
const User = mongoose.model('User', userSchema);

module.exports = User;