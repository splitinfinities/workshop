var promise = require('bluebird');

var options = {
  // Let's use a smarter promise library
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/rspace';
var db = pgp(connectionString);

module.exports = db;
