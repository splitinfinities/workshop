var express = require('express');
var router = express.Router();
var db = require('../../queries');

/* Stories endpoints */
router.get('/stories/:id/likes', db.getLikes);
router.post('/stories/:id/likes', db.createLike);
router.delete('/stories/:id/likes/:id', db.removeLike);
router.options('/stories/likes', db.getOptionsLikes);

router.get('/users/:id/likes', db.getLikes);
router.post('/users/:id/likes', db.createLike);
router.delete('/users/:id/likes/:id', db.removeLike);
router.options('/users/likes', db.getOptionsLikes);

module.exports = router;
