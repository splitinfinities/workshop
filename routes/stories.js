var express = require('express');
var router = express.Router();
var db = require('../queries/stories');

/* Stories endpoints */
router.get('/', db.getAllStories);
router.get('/:id', db.getSingleStory);
router.post('/', db.createStory);
router.put('/:id', db.updateStory);
router.delete('/:id', db.removeStory);
router.options('/', db.getOptionsStories);

module.exports = router;
