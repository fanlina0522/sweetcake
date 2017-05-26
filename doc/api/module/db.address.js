var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('Sweetcake', server);

var save_address = function(_collection,data){
	db.open(function(error,db){
		if (error) {
			console.log(error);
		} 
		db.collection(_collection,function(err,collection){
			if (err) {
				console.log(err);
			} else {
				collection.insert(data);
			}
			db.close();
		})
	})
}

exports.save_address = save_address;