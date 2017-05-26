var db = require('../module/db.search.js');
var db1 = require('../module/db.address.js');
var db2 = require('../module/db.czaddress.js');
var db3 = require('../module/db.order.js');

var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


exports.Register = function(app){
    //首页的搜所项
	app.post('/keylist',urlencodedParser,function(request,response){
		// console.log(request.body._keyword);
		db.exists(request.body._keyword,response);
			
	});

    //添加地址
    app.post('/add-address',urlencodedParser,function(request,response){
        db1.exists('address', request.body, function(result){
            console.log(result);
            // console.log(request.body);
            if(result){
                response.send(apiResult(false,'message:"已存在相同地址"'));
            } else {
                db1.save('address', request.body);
                response.send(apiResult(true));
            }
        })
    })

    // 读取地址
    app.post('/address',urlencodedParser,function(request,response){
        db2.exists('address',function(result){
            response.send(result);
        })
    })

    //请求订单
    app.post('/order',urlencodedParser,function(request,response){
        db3.exists('orders',function(result){
            response.send(result);
        })
    })

}





