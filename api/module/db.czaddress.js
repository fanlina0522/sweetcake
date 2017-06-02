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

//设置默认地址
// var update = function(id,response){
//     db.open(function(error, db){
//         if(error){
//             console.log('connect db:', error);
//         }
//         db.collection('address', function(error, collection){
//             if(error){
//                 console.log(error);
//             } else {
//                 collection.update({id:id},{$set:{status:true}});
//             }
//             db.close();
//         })
//     })
// }

exports.exists = exists;
// exports.update = update;
