'use strict';

//load express router
const express = require('express');
const router = express.Router();

//load Ad module
const Ad = require('../../models/Ad');

// get tags view
router.get('/', async (req, res, next) => {
    try {
        let tagsAndQueries = [];
        const distinctTags = await Ad.distinct('tags').exec();
        distinctTags.forEach((tag) => {
            let obj = {
                tagName: tag,
                queryStr: `/../apiv1/ads/?tags=${tag}`
            };
            tagsAndQueries.push(obj);
        });
        res.render('apitags', { tagsAndQueries: tagsAndQueries });
        } catch(err) {
        next(err);
    }
});


module.exports = router;