'use strict';
//load mongoose module
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// define scheme for ads
const adSchema = mongoose.Schema({
    name: String,
    selling: Boolean,
    price: Number,
    pic: String,
    tags: [String]
});

// create a static method

adSchema.statics.list = function(filter, tagFilter, limit, skip) {
    let query = Ad.find(filter);
    query = query.find(tagFilter);
    query.limit(limit);
    query.skip(skip);
    return query.exec();
};


// create ad model using scheme
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;