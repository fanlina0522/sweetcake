var mongodb = require('mongodb');

var server = new mongodb.Server('10.3.133.28', 27017);

var db = new mongodb.Db('Sweetcake', server);

exports.db = db;