var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('Sweetcake', server);

var exists = function(_name, response){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		db.collection('cake', function(error, collection){
			if(error){
				console.log(error);
			} else {
                var reg = new RegExp("^.*"+_name+"\.*$","i");
                collection.find({name:{$regex:reg}}).toArray(function(err, docs){
                    response.send(docs);
					// console.log(docs);
				});
			}
			db.close();
		})
	})	
}

exports.exists = exists;