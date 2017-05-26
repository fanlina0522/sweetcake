
//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');

var db = reqiure('../modules/db.address.js');

var apiResult = require('../modules/apiResult.module.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


