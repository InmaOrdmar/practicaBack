'use strict';

// load dependencies and create router
const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
	const locale = req.params.locale;
	const backTo = req.get('Referer');
	res.cookie('nodepop-lang', locale, {
		maxAge: 2 * 24 * 60 * 60 * 1000,
		httpOnly: true
	});
	res.redirect(backTo);
});

module.exports = router;