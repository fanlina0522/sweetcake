//npm install mongodb
var db = require('./db.common').db;

//连接db
var exists = function(_collection, data, callback){
    db.open(function(error, db){
        if(error){
            console.log('connect db:', error);
        }
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
                collection.find(data).toArray(function(err, docs){
                    callback(docs[0])
                });
            }
            db.close();
        })
    })
}

var save = function(_collection, data){
    db.open(function(error, db){
        if(error){
            console.log('connect db:', error);
        }
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

//将exists方法暴露出去
exports.exists = exists;
exports.save = save;