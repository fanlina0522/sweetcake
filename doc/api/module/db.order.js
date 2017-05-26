var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('Sweetcake', server);

// 获取所有订单
var orderall = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {				
				collection.find().toArray(function(err, docs){
					console.log(docs)
					callback(docs);
				});
			}
			db.close();
		})
	})	
}

exports.orderall = orderall;