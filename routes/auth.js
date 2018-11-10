'use strict';

// load dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
    if (!user || !await bcrypt.compare(password, user.password)) {
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
        res.json({ success: true, token });
    });
 } catch(err) {
    next(err);
 }
});

module.exports = router;