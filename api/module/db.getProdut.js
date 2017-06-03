var db = require('./db.common.js').db;

// id查询商品
var getProdut = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					if (docs.length>=1) {
						callback(docs);
					}else{
						callback();
					}
					
				});
			}
			db.close();
		})
	})	
}
// type查询商品
var getType = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){																								
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					if (docs.length>=1) {
						callback(docs);
					}else{
						callback();
					}
					
				});
			}
			db.close();
		})
	})	
}

// 获取所有商品
var all = function(_collection, data, key, callback){
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
				collection.find().toArray(function(err, docs){
					// console.log(docs)
					callback(docs);
					db.close();
				});
			}
			
		})
	})	
}

// 添加商品
var saveProdut = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {

				var id_obj = {};
				id_obj[key] = data[key];
				console.log(id_obj)
				collection.find(id_obj).toArray(function(err, docs){
					console.log(docs.length);

					if (docs.length>=1) {
						callback();
						db.close();
					}else{
						data.images = JSON.parse(data.images);
						data.norms = JSON.parse(data.norms);
						data.type = JSON.parse(data.type);
						// console.log(data);
						var obj = {};
						for(var key in data){
							obj[key] = data[key];
						}
						collection.insert(obj);
						callback(data);
						db.close();
					}
				});
				
				
			}
			
		})
	})	
}

// 修改商品
var modifyProdut = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error);	
			} else {
				// data._id = JSON.parse(data._id);
				data.norms = JSON.parse(data.norms);
				data.type = JSON.parse(data.type);
				
				var obj = {};
				for(var key in data){
					obj[key] = data[key];
				}
				console.log(obj);
				collection.update({'id':data.id},{$set:obj});
				callback(data);
				db.close();
			}			
		})
	})	
}

// 查询id是否存在
var getProdut_id = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//_collection=>cake => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					if (docs.length==0) {
						callback();
					}else{
						callback(docs);
					}
				});
			}
			db.close();
		})
	})	
}

exports.all = all;

exports.getProdut = getProdut;

exports.getType = getType;

exports.saveProdut = saveProdut;

exports.getProdut_id = getProdut_id;

exports.modifyProdut = modifyProdut;