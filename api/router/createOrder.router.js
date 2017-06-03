var db = require('../module/db.createOrder.js')

var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register =function(app){
	app.post('/car',urlencodedParser,function(request, response){
		response.send('');
		db.exists('order',request.body,function(){
			console.log(request.body)
			db.save('order', request.body); 	
		})
	})
}
