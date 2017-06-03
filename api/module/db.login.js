var db = require('./db.common').db;

var exists = function(name,pasword, response){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('userData', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				console.log(name,pasword)
				collection.find({userName:name,password:pasword}).toArray(function(err, docs){
					        console.log(docs)
							response.send(docs)
						});
			}
			db.close();
		})
	})	
}
exports.exists = exists;