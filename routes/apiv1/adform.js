'use strict';

//load express router
const express = require('express');
const router = express.Router();

//load Ad module
const Ad = require('../../models/Ad');

// middleware
router.get('/', async (req, res, next) => {
    try {
        res.send('ok');
    } catch(err) {
        next(err);
    }
});

module.exports = router;