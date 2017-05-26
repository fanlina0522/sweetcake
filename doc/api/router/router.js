var path = require('path');

var produtRouter = require('./produt.js');
var orderRouter = require('./order.js');

exports.produt = function(express){
	var app = express();

	produtRouter.Register(app);
	orderRouter.Register(app);

	app.get('/', function(request, response){
		response.send('root');
	})
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(888);
	console.log('888');
}


