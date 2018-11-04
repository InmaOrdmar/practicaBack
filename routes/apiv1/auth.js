'use strict';

// load dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    console.log(email, password);

    // find user
    const user = await User.findOne({ email: email });
    if (!user || !await bcrypt.compare( password, user.password)) {
        res.json({ success: false, error: 'Invalid credentials'});
        return;
    }
    res.json(user);
 } catch(err) {
    next(err);
 }
});


module.exports = router;