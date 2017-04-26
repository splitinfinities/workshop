// Get the connection
var db = require('../db');
var documentation = require('../documentation/users');
var crypto = require('crypto');

// GET /api/auth/:id
function getSessionDetails(req, res, next) {
	var tokenID = req.params.token;

	options = {
		'logout': `DELETE @ /api/auth`,
	};

	db.one('select * from sessions where token = $1', tokenID)
	.then(function (data) {

		res.status(200)
		.json({
			status: 'success',
			data,
			options,
			message: 'Retrieved the session'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// POST /api/auth
// This endpoint should take the same parameters, but update the specific user
function createSession(req, res, next) {
	// Grab the user by email
	// confirm that the user

	var authResult = _doLogin({
		username: req.params.username,
		email_address: req.params.email_address
	}, req.params.password);

	if (authResult) {
		var token = _doToken();
		var user_id = authResult.user_id;
		var created = new Date();
		var expires = new Date(); // add a month

		db.none(`insert into sessions(user_id, token, created, expires)` +
		        `values(${user_id}, ${token}, ${created}, ${expires})`)
		.then(function () {
			res.status(200)
			.json({
				status: 'success',
				message: 'Inserted one user'
			});
		})
		.catch(function (err) {
			return next(err);
		});
	} else {

	}
}

// PUT /users/:id
// This endpoint should take the same parameters, but update the specific user
function updateSession(req, res, next) {
	db.none('update users set expires=$1 where token=$2',
	        [req.body.name, req.body.breed])
	.then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated your user'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// DELETE /users/:id
// This endpoint should take the same parameters, but update the specific user
function removeSession(req, res, next) {
	var userID = parseInt(req.params.id);
	db.result('delete from users where id = $1', userID)
	.then(function (result) {
		res.status(200)
		.json({
			status: 'success',
			message: `Removed ${result.rowCount} users`
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// OPTIONS /users
function getOptionsSessions(req, res, next) {
	console.log('nice');

	return res.status(200)
	.json({
		status: 'success',
		data: documentation,
		message: 'Here\'s what ya got to work with!'
	});
}

//---
//--- PRIVATE METHODS
//---
function _unhashPassword(password) {
	var salt = crypto.randomBytes(128).toString('wake-up-get-up-get-out-there');
	var iterations = 10000;
	var hash = pbkdf2(password, salt, iterations);

	return {
		salt: salt,
		hash: hash,
		iterations: iterations
	};
}

// Add query functions
module.exports = {
	// Users
	getSessionDetails,
	createSession,
	updateSession,
	removeSession,
	getOptionsSessions,
};
