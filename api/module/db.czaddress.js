//npm install mongodb
var mongodb = require('mongodb');

//连接mongodb服务器
var server = new mongodb.Server('localhost',27017);

var db = new mongodb.Db('mydb',server);

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

exports.exists = exists;