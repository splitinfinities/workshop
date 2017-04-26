var express = require('express');
var router = express.Router();
var db = require('../queries/users');

/* Stories endpoints */
router.get('/', db.getAllUsers);
router.get('/:id', db.getSingleUser);
router.post('/', db.createUser);
router.put('/:id', db.updateUser);
router.delete('/:id', db.removeUser);
router.options('/', db.getOptionsUsers);

module.exports = router;
