var path = require('path');

// var AccountRouter = require('./Account.router.js');
// var ProductRouter = require('./Product.router.js');
var SrcRouter = require('./src.router.js');
var commodityRouter = require('./commodity.router.js');
var loginRouter= require('./login.router.js');

var produtRouter = require('./produt.js');
var orderRouter = require('./order.js');
var admin = require('./adminLogin.js');


/*goodsdetail 引用-chaoping*/
var DetailRoute = require('./Detailroute.js');
var creOrder = require('./createOrder.router')
exports.Register = function(express){
	var app = express();
    commodityRouter.Register(app);
	// AccountRouter.Register(app);
    loginRouter.Register(app);

	SrcRouter.Register(app);
	creOrder.Register(app);
	/*goodsdetail 引用-chaoping*/
	DetailRoute.Route(app);

	//后台router
    produtRouter.Register(app);
    orderRouter.Register(app);
    admin.Register(app);

	app.get('/', function(request, response){
		response.send('root');
	})
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(8888,function () {
		console.log("监听中...")
    });
}