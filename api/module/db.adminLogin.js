var db = require('./db.common.js').db;

var orderall = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);
				db.close();	
			} else {				
				collection.find(data).toArray(function(err, docs){
					if (docs.length>=1) {
						// console.log(data,docs)
						callback(docs);	
						db.close();
					}					
				});
			}
		
		})
	})	
}

exports.orderall = orderall;