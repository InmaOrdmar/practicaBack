'use strict';

// load dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../../models/User');

// create router
const router = express.Router();

router.get('/', (req, res, next) => {
	try {
		res.render('login');
	} catch(err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
 try {
    // get body params
    const email = req.body.email;
    const password = req.body.password;

    // find user
    const user = await User.findOne({ email: email });
    if (!user || !await bcrypt.compare( password, user.password)) {
        res.json({ success: false, error: 'Invalid credentials'});
        return;
    }
    //create jwt
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    }, (err, token) => {
        if (err) {
          next(err);
          return;
        }
        res.setHeader('x-access-token', token);
        res.redirect('/apiv1/ads');
    });
 } catch(err) {
    next(err);
 }
});


module.exports = router;