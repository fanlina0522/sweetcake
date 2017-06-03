
var db = require('../module/db.login.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.Register = function(app){

app.post('/html/Login', urlencodedParser, function(request, response){
	 // console.log(request.body)
db.exists(request.body.my_nameg,request.body.my_pass,response)
				
 })
}