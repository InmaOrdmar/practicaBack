'use strict';

//load mongoose library and connection
const mongoose = require('mongoose');
const conn = mongoose.connection;

//handle connection errors
conn.on('error', err => {
    console.error('Connection error', err);
    // exit applicaton process
    process.exit(1);
});

conn.once('open', () => {
    console.log('connected to db at', conn.name);
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});

module.exports = conn;



