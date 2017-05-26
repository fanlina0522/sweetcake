var path = require('path');

// var AccountRouter = require('./Account.router.js');
// var ProductRouter = require('./Product.router.js');
var SrcRouter = require('./src.router.js');
var commodityRouter = require('./commodity.router.js');
var produtRouter = require('./produt.js');

/*goodsdetail 引用-chaoping*/
var DetailRoute = require('./Detailroute.js');

exports.Register = function(express){
	var app = express();
    commodityRouter.Register(app);
	// AccountRouter.Register(app);
    produtRouter.Register(app);
	SrcRouter.Register(app);

	/*goodsdetail 引用-chaoping*/
	DetailRoute.Route(app);

	app.get('/', function(request, response){
		response.send('root');
	})
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(8888,function () {
		console.log("监听中...")
    });
}