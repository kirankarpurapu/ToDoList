'use strict';

var express = require("express");
var routes = require("./routes/route");
var logger = require("morgan");

var app = express();
var bodyParser = require('body-parser');
var jsonParser = require("body-parser").json;
var validator = require('express-validator');
var port = process.env.PORT || 3000;


// Registering the looger middleware
app.use(logger("dev"));


// Registering the middleware: using the jsonParser middleware to open the POST and GET requests

app.use(jsonParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

//for allowing cross scripting

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow_Origin", "*");
// 	res.header("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();

// });

// Registering the routes middleware and this module only works for routes that begin with /todo.
// i.e. any request on a route starting with /todo is redirected to the routes module and the routes module
// will have the appropriate handlers to process the requests.
app.use("/todo", routes);



// Error handler
app.use(function(err, req, res, next){
	console.log("error handler invoked with status ", err.status);
	res.status(err.status || 500);
	console.log(res.status);
	res.json({
		error : {
			message : err.message
		}
	});
});

//starting the server on the specified port
app.listen(port, function() {
	console.log("server setup on port 3000");
});