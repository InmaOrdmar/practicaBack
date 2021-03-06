'use strict';

//load express router
const express = require('express');
const router = express.Router();


//load Ad module
const Ad = require('../../models/Ad');

//load authentication module
const jwtAuth = require('../../lib/jwtAuth');

// check if user is logged in
router.use(jwtAuth());

router.get('/', async (req, res, next) => {
    try {
        // get queries
        const name = req.query.name;
        const tags = req.query.tags;
        const selling = req.query.selling;
        const price = req.query.price;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        // build filter
        const filter = {};
        if (name) {
            filter.name = new RegExp('^' + name, "i");
        };
        if (selling !== undefined) {
            filter.selling = selling;
        };
        if (price) { 
            // separate min and max values as two elements of an array
            const priceArray = price.split('-');
            // create void price filter
            filter.price = {};
            // for each element of the array, check if it's a number
            // and store it as a min or max depending on its index
            priceArray.forEach((item, i) => {
                var num = Number(item);
                if (num && !i) {
                    filter.price.$gte = num; 
                } else if (num && i) {
                    filter.price.$lte = num;
                }
            }); 
        };
        // create void tag filter
        var tagFilter = {};
        if(tags && !Array.isArray(tags)) {
            // if there is only one tag, then 'tags' is a string (not an array)
            // and can be stored directly as a query
            tagFilter.tags = tags;
        } else if (tags) {
            // if there is more than one tag, then 'tags' is an array
            // and we need to use $all so the filtered items contain all the tags
            tagFilter.tags = { $all: tags };
        };
        
        const ads = await Ad.list(filter, tagFilter, limit, skip);
        res.render('apiresults', { ads: ads });
        // example query:
        // http://localhost:3000/apiv1/ads/?tags=lifestyle&tags=work&selling=true&price=10-100&limit=3&skip=1
    } catch(err) {
        next(err);
    }
});

// POST METHOD TO RETRIEVE AND APPLY FILTERS FROM FILTER FORM
router.post('/', async (req, res, next) => {
    try {
        // retrieve sent data 
        const formData = req.body;
        // build query string
        let queries = [];
        if(formData.name) {
            queries.push(`name=${formData.name}`);
        }
        if(formData.min && formData.max) {
            queries.push(`price=${formData.min}-${formData.max}`);
        } else if (formData.min) {
            queries.push(`price=${formData.min}-`);
        } else if (formData.max) {
            queries.push(`price=-${formData.max}`);
        }
        if(formData.operation === 'sell') {
            queries.push('selling=false');
        } else if (formData.operation === 'buy') {
            queries.push('selling=true');
        }
        if (formData.lifestyle) {
            queries.push('tags=lifestyle');
        }
        if (formData.work) {
            queries.push('tags=work');
        }
        if (formData.motor) {
            queries.push('tags=motor');
        }
        if (formData.mobile) {
            queries.push('tags=mobile');
        }
        const queryString = '/apiv1/ads/?' + queries.join('&');
        console.log(queryString);
        // redirect to query
        res.redirect(queryString);
    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;