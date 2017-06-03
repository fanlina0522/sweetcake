var db = require('../module/db.adminLogin.js');
var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');

exports.Register = function(app){

	//设置 session
	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
		// cookie: {maxAge: 800000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}));

	// 登录
	app.post('/admin', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		
		db.orderall('admin', request.body, 'adminName', function(data){
			if(data){
				request.session.adminName = request.body.adminName;//将已登录用户名存入session
				response.send(apiResult(true,'登录成功',data[0].adminName))
			} else {
				response.send(apiResult(false, '登录错误，请核对帐号密码'));
			}
		})
	});

	// 获取服务器cookies adminName
	app.get('/getsession', function(request, response){
		// console.log(request.session.adminName)
		response.send(apiResult(request.session.adminName != null, null, request.session.adminName));
	});

	// 去除 cookies adminName
	app.get('/removesession', function(request, response){
		request.session.adminName = false;
		response.send(apiResult(request.session.adminName != false, null, request.session.adminName));

	});
	
}