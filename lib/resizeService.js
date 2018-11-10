'use strict';

const cote = require('cote');
const path = require('path');
const Jimp = require('jimp');

const responder = new cote.Responder({name: 'resize responder'});

responder.on('resize', (req, done) => {
    console.log('resizing started');
    const oldFilename = req.filename;
    const filePath = path.join('public/images', oldFilename);
    console.log(filePath);
    const newFilename = `${oldFilename}_thumbnail`;
    const newPath = path.join('public/images', newFilename);
    console.log(newPath);
    Jimp.read(filePath)
    .then(img => {
        img.clone().resize(100, 100).write(newPath);
    }).catch(err => { 
        throw new Error(`There was an error while resizing: ${err}`);
    });
    done(null, newFilename);
});