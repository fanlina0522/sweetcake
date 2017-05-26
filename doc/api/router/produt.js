var db = require('../module/db.getProdut.js');
var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var multer = require ('multer');

var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, '../images') ; 
  },  
  filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");
      // cb(null, file.fieldname + "." + fileFormat[fileFormat.length - 1]);
      cb(null,file.originalname)  ;  
  }  
}); 
var upload = multer({ storage: storage })

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
		cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}));

	// 上传图片
	app.post('/upload', upload.array('photos', 12), function(req, res) {
		res.setHeader("Access-Control-Allow-Origin","*");
		// console.log(req.files);  
		// console.log(req.body); 	
		var imgarr=[];
		req.files.map(function(item){
			imgarr.push(item.filename);
		});	
	 	res.send(apiResult(true, '上传成功',imgarr)); 
	});

	// id查询商品
	app.post('/getProdut', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		db.getProdut('cake', request.body, 'id', function(data){
			if(data){
				response.send(apiResult(true,'查找成功',data))
			} else {
				response.send(apiResult(false, '商品ID错误'));
			}
		})
	});

	// 查询id存在
	app.post('/getProdut_id', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		db.getProdut_id('cake', request.body, 'id', function(data){
			// console.log(request.body)
			if(data){
				// request.session.name = request.body.name;//将已登录用户名存入session
				response.send(apiResult(true,'商品ID重复，请认真核对'))
			} else {
				response.send(apiResult(false, '商品ID无重复'));
			}
		})
	});

	// 修改商品
	app.post('/setProdut', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		db.exists('cake', request.body, 'id', function(data){
			if(data){
				// request.session.name = request.body.name;//将已登录用户名存入session
				response.send(apiResult(true,'修改成功'))
			} else {
				response.send(apiResult(false, '修改失败'));
			}
		})
	});

	// 添加商品
	app.post('/saveProdut', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		db.saveProdut('cake', request.body, 'id', function(data){
			if(data){
				// request.session.name = request.body.name;//将已登录用户名存入session
				response.send(apiResult(true,'提交成功'))
			} else {
				response.send(apiResult(false, '商品id重复，提交失败'));
			}
		})
	});

	// 获取所有商品
	app.post('/Produt', urlencodedParser, function(request, response){
		response.setHeader("Access-Control-Allow-Origin","*");
		// console.log(request.body);
		db.all('cake', request.body, 'id', function(data){
			if(data){
				// request.session.name = request.body.name;//将已登录用户名存入session
				response.send(apiResult(true,'',data))
			} else {
				response.send(apiResult(false, '商品ID错误'));
			}
		})
	})
}