var db = require('./db.common').db;
var exists = function(name,keyword, response){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('cake', function(error, collection){
			if(error){
				console.log(error)	
			} else {


				if (keyword == 'null') {
					console.log(name)
					if(name=="全部蛋糕 All Cake"){
                        collection.find().toArray(function(err, docs){
                            response.send(docs)
                        });
					}else{
                        collection.find({type:name}).toArray(function(err, docs){
                            response.send(docs)
                        });
					}

				}
				else if(name == "null"){
					 var reg = new RegExp("^.*"+keyword+"\.*$","i");
			            collection.find({name:{$regex:reg}}).toArray(function(err, docs){
			              response.send(docs);

					});
				}
				
			}
			db.close();
		})
	})	
}
exports.exists = exists;