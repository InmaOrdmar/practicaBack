'use strict';

//load depencencies
const express = require('express');
const multer = require('multer');
const cote = require('cote');

//load Ad module
const Ad = require('../../models/Ad');

//load resize client
const resizeClient = require('../../lib/resizeClient');

// create router
const router = express.Router();

// set multer storage settings
var storage = multer.diskStorage ({
    destination: 'public/images',
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });

// get form view
router.get('/', async (req, res, next) => {
    try {
        res.render('adform', { message: '' });
    } catch(err) {
        next(err);
    }
});

// POST METHOD TO UPLOAD NEW AD
router.post('/', upload.single('pic'), async (req, res, next) => {
    try {
        //get data
        const formFields = req.body;
        // get picture, keep original name and save it in /images/
        req.file.filename = req.file.originalname;
        const picture = req.file;
        // request resizing and save 
        picture.filename = resizeClient(picture.filename);
        
        // create new object ad
        const adFields = {
            name: formFields.name,
            price: formFields.price,
            pic: picture.filename
        };
        if(formFields.operation === 'sell') {
            adFields.selling = true;
        } else if (formFields.operation === 'buy') {
            adFields.selling = false;
        }
        let tags = [];
        if(formFields.lifestyle) {
            tags.push('lifestyle');
        }
        if(formFields.motor) {
            tags.push('motor');
        }
        if(formFields.mobile) {
            tags.push('mobile');
        }
        if(formFields.work) {
            tags.push('work');
        }
        if(tags.length > 0) {
            adFields.tags = tags;
        }
        // store new ad in nodepop database
        const newAd = new Ad(adFields);
        const savedAd = await newAd.save();

        res.render('adform', { message: 'Your ad has been published!' });
    } catch(err) {
        next(err);
    }
});

module.exports = router;