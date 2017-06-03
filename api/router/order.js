var db = require('../module/db.order.js');
var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');

exports.Register = function(app){

	//设置 session
	// app.use(cookieParser());
	// app.use(session({
	// 	secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
	// 	name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	// 	cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	// 	resave: false,
	// 	saveUninitialized: true,
	// }));

	// 获取所有订单
	app.post('/order', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		// console.log(request.body);
		db.orderall('order', request.body, 'orderID', function(data){
			if(data){
				response.send(apiResult(true,'订单查询成功',data))
			} else {
				response.send(apiResult(false, '订单ID错误'));
			}
		})
	})
	// 获取所有订单
	app.post('/getorder', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		console.log(request.body);
		db.getorder('order', request.body, 'orderID', function(data){
			if(data){				
				response.send(apiResult(true,'订单查询成功',data))
			} else {
				response.send(apiResult(false, '订单ID错误'));
			}
		})
	})
}