'use strict';

const jwt = require('jsonwebtoken');


module.exports = function() {
	return (req, res, next) => {
		const token = req.body.token || req.query.token || req.get('x-access-token');
		if (!token) {
			res.status(401).send({error: 'no token provided'});
			return;
		}
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).send({error: 'no token provided'});
				return;
			}
			req.userId = decoded._id;
			console.log(`user id: ${req.userId}`);
			next();
		});
	};
};