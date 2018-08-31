'use strict';
//load mongoose module
const mongoose = require('mongoose');

// define scheme for ads
const adSchema = mongoose.Schema({
    name: String,
    selling: Boolean,
    price: Number,
    pic: String,
    tags: [String]
});

// create ad model using scheme
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;