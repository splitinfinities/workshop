var express = require('express');
var router = express.Router();
var db = require('../queries/auth');

/* Stories endpoints */
router.get('/:token', db.getSessionDetails);
router.post('/', db.createSession);
router.put('/:token', db.updateSession);
router.delete('/:token', db.removeSession);
router.options('/', db.getOptionsSessions);

module.exports = router;
