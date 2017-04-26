// Get the connection
var db = require('../db');
var documentation = require('../documentation/stories');

// GET /stories
function getAllStories(req, res, next) {
	var limit = (req.query.limit) ? parseInt(req.query.limit) : 20;
	var page = (req.query.page) ? parseInt(req.query.page) : 1;
	var offset = (req.query.offset) ? parseInt(req.query.offset) : 0;
	var entities = (req.query.entities) ? (req.query.entities === 'true') : false;

	offset = ((page - 1) * limit);

	options = {
		'next_page': `/api/stories/?page=${(page + 1)}&limit=${limit}`
	};

	if ((page - 1) !== 0) {
		options['previous_page'] = `/api/stories/?page=${(page - 1)}&limit=${limit}`
	}

	db.any(`select * from stories where deleted is null limit ${limit} offset ${offset}` )
	.then(function (data) {
		if (entities) {
			data.forEach(function(story, i) {
				var ownerID = story.owner;

				db.one(`select * from users where id = $1`, ownerID)
				.then(function (ownerData) {
					delete ownerData.salt;
					delete ownerData.password;
					ownerData.color = "red";

					data[i].owner = ownerData;

					if (i === (data.length - 1)) {
						res.status(200)
						.json({
							status: 'success',
							data,
							options,
							message: `Retrieved ${data.length} stories`
						});
					}
				})
				.catch(function (err) {
					return next(err);
				});

			});

		} else {
			res.status(200)
			.json({
				status: 'success',
				data,
				options,
				message: `Retrieved ${data.length} stories`
			});
		}
	})
	.catch(function (err) {
		return next(err);
	});
}

// GET /stories/:id
function getSingleStory(req, res, next) {
	var storyID = parseInt(req.params.id);

	options = {
		'likes': `/api/stories/${storyID}/likes`,
	};

	db.one('select * from stories where id = $1 and deleted is null', storyID)
	.then(function (data) {

		var nextStoryId = _getNextSingleStory(storyID, data.owner);
		var prevStoryId = _getPrevSingleStory(storyID, data.owner);

		if (nextStoryId) {
			options['next_story_by_owner'] = `/api/stories/${nextStoryId}`;
		}

		if (prevStoryId) {
			options['previous_story_by_owner'] = `/api/stories/${prevStoryId}`;
		}

		res.status(200)
		.json({
			status: 'success',
			data,
			options,
			message: 'Retrieved one story'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// POST /stories
// This endpoint should take the same parameters, but update the specific story
function createStory(req, res, next) {
	db.result('insert into stories(content, owner)' +
	        'values($1, $2) returning *',
	        [req.query.content, req.query.owner])
	.then(function (result) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted one story',
			data: result.rows[0]
		});
	})
	.catch(function (err) {
		console.log(err);
		return next(err);
	});
}

// PUT /stories/:id
// This endpoint should take the same parameters, but update the specific story
function updateStory(req, res, next) {
	db.result('update stories set content=$1, owner=$2 where id=$3 returning *',
	        [req.query.content, req.query.owner, parseInt(req.params.id)])
	.then(function (result) {
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated ya story!',
			data: result.rows[0]
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// DELETE /stories/:id
// This endpoint should take the same parameters, but update the specific story
function removeStory(req, res, next) {
	var storyID = parseInt(req.params.id);

	db.result('delete from stories where id = $1', storyID)
	.then(function (result) {
		res.status(200)
		.json({
			status: 'success',
			message: `Removed ${result.rowCount} stories`
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

// OPTIONS /stories
function getOptionsStories(req, res, next) {
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
function _getNextSingleStory(storyID, ownerID) {
	var statement = 'select * from stories where id > $1';

	if (ownerID) {
		statement += ' and owner = $2'
	}

	db.one(statement, [storyID, ownerID])
	.then(function (result) {
		return result;
	})
	.catch(function (err) {
		return err.message;
	});

}

function _getPrevSingleStory(storyID, ownerID) {
	var statement = 'select * from stories where id < $1';

	if (ownerID) {
		statement += ' and owner = $2'
	}

	db.one(statement, [storyID, ownerID])
	.then(function (result) {
		return result;
	})
	.catch(function (err) {
		return err.message;
	});
}


// Add query functions
module.exports = {
	// Users
	getAllStories: getAllStories,
	getSingleStory: getSingleStory,
	createStory: createStory,
	updateStory: updateStory,
	removeStory: removeStory,
	getOptionsStories: getOptionsStories,
};
