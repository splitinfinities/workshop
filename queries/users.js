// Get the connection
var db = require('../db');
var documentation = require('../documentation/users');
var crypto = require('crypto');

// GET /users
function getAllUsers(req, res, next) {
	var limit = (req.query.limit) ? parseInt(req.query.limit) : 20;
	var page = (req.query.page) ? parseInt(req.query.page) : 1;
	var offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
	offset = ((page - 1) * limit);

	options = {
		'next_page': `/api/users/?page=${(page + 1)}&limit=${limit}`
	};

	if ((page - 1) !== 0) {
		options['previous_page'] = `/api/users/?page=${(page - 1)}&limit=${limit}`
	}

	db.any(`select * from users limit ${limit} offset ${offset}` )
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data,
			options,
			message: `Retrieved ${data.length} users`
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// GET /users/:id
function getSingleUser(req, res, next) {
	var userID = parseInt(req.params.id);

	options = {
		'likes': `/api/users/${userID}/likes`,
	};

	db.one('select * from users where id = $1', userID)
	.then(function (data) {

		res.status(200)
		.json({
			status: 'success',
			data,
			options,
			message: 'Retrieved one user'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// POST /users
// This endpoint should take the same parameters, but update the specific user
function createUser(req, res, next) {
	req.body.age = parseInt(req.body.age);

	var auth = _hashPassword(req.params.password);

	db.none(`insert into users(first_name, last_name, email, password)` +
	        `values(${first_name}, ${last_name}, ${email}, ${password})`,
	        req.body)
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
}

// PUT /users/:id
// This endpoint should take the same parameters, but update the specific user
function updateUser(req, res, next) {
	db.none('update users set first_name=$1, last_name=$2, email=$3 where id=$5',
	        [req.body.name, req.body.breed, parseInt(req.body.age),
	        req.body.sex, parseInt(req.params.id)])
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
function removeUser(req, res, next) {
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
function getOptionsUsers(req, res, next) {
	res.status(200)
	.json({
		status: 'success',
		data: documentation,
		message: 'Here\'s what ya got to work with!'
	});
}

//---
//--- PRIVATE METHODS
//---
function _hashPassword(password) {
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
	getAllUsers: getAllUsers,
	getSingleUser: getSingleUser,
	createUser: createUser,
	updateUser: updateUser,
	removeUser: removeUser,
	getOptionsUsers: getOptionsUsers,
};
