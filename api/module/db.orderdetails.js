var db = require('./db.common').db;

var exists = function(orderid, response){
    db.open(function(error, db){
        if(error){
            console.log('connect db:', error);
        }
        db.collection('order', function(error, collection){
            if(error){
                console.log(error);
            } else {
                collection.find({orderID:orderid}).toArray(function(err, docs){
                    response.send(docs);
                    console.log(123,docs);
                });
            }
            db.close();
        })
    })
}

exports.exists = exists;