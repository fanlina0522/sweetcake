
var db = require('../module/commodity.db.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app){

app.get('/html/Group-list', urlencodedParser, function(request, response){

	 //console.log(request.query)
	db.exists(request.query._name,request.query._keyword,response)
				
 })
}