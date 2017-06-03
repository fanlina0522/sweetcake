var db = require('./db.common').db;

//连接db
var exists = function(_collection,callback){
    db.open(function(error, db){
        if(error){
            console.log('connect db:', error);
        }
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find().toArray(function(err, docs){
                    callback(docs);
                });
            }
            db.close();
        })
    })
}

//删除订单
var del = function(orderid,response){
    db.open(function(error, db){
        if(error){
            console.log('connect db:', error);
        }
        db.collection('order', function(error, collection){
            if(error){
                console.log(error);
            } else {
                collection.remove({orderID:orderid});
            }
            db.close();
        })
    })
}

// 获取所有订单
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
                collection.find().toArray(function(err, docs){
                    // console.log(docs)
                    callback(docs);
                    db.close();
                });
            }
        })
    })
}
// id查询商品
var getorder = function(_collection, data, key, callback){
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
                    console.log(obj);
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

exports.orderall = orderall;

exports.getorder = getorder;

exports.exists = exists;
exports.del = del;