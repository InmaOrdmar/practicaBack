'use strict';

//load express router
const express = require('express');
const router = express.Router();

//load Ad module
const Ad = require('../../models/Ad');

router.get('/', (req, res, next) => {
    Ad.find().exec((err, ads) => {
        if(err) {
            next(err);
            return;
        }
        res.json({success: true, result: ads});
    });
});

module.exports = router;