var express = require('express');
var Token = require('../shared/token');
var secret = require('../shared/config/session').secret;
var app = express.createServer();
var publicPath = __dirname +  '/public';

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(app.router);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('view options', {layout: false});
  app.set('basepath', publicPath);
});

app.configure('development', function(){
  app.use(express.static(publicPath));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = -1;
  app.use(express.static(publicPath, { maxAge: oneYear }));
  app.use(express.errorHandler());
});

var id = 1000;

var ipMap = {};

app.post('/login', function(req, res) {
  var msg = req.body;
  var ip = req.connection.remoteAddress;
	var uid = ipMap[req.sessionID]||++id;
	ipMap[req.sessionID] = uid;
	res.send({code: 200, token: Token.create(uid, Date.now(), secret), uid: uid});
});

app.listen(3001);

// Uncaught exception handler
process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});

console.log("Web server has started.\n Please log on http://0.0.0.0:3001/");

