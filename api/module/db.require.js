var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('Sweetcake', server);


//数据是否存在
var exists = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					callback(docs[0])
				});
			}
			db.close();
		})
	})	
}


//query查询
var queryData = function(_collection, data, key, callback){

	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					callback(docs[0])
				});
			}
			db.close();
		})
	})	
}


//分页查询 pagesize currentpage
var moreCom = function(_collection, data, key, callback){

	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];

				//请求页
				var currentPage = data.currentPage;
				//请求数量
				var pageAmount = Number(data.pageAmount);

				collection.find(obj).skip(currentPage*pageAmount).limit(pageAmount).toArray(function(err, docs){
					callback(docs)
				});
			}
			db.close();
		})
	})	
}



//保存
var save = function(_collection, data){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.insert(data);
			}
			db.close();
		})
	})
}

exports.exists = exists;
exports.save = save;
exports.queryData = queryData;
exports.moreCom = moreCom;
