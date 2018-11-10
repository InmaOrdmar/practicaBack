'use strict';

const cote = require('cote');

const requester = new cote.Requester({name: 'resize requester'});

module.exports = function(filename) {
    requester.send({type: 'resize', filename}, resizedFilename => {
        console.log(`request sent with payload ${filename}`);
        return resizedFilename;
    });
}
