'use strict';

var express = require("express");
var routes = require("./routes");
var logger = require("morgan");

var app = express();
var jsonParser = require("body-parser").json;
var port = process.env.PORT || 3000;


// Registering the looger middleware
app.use(logger("dev"));


// Registering the middleware: using the jsonParser middleware to open the POST and GET requests
app.use(jsonParser());


app.use(function(req, res, next) {
	res.header("Access-Control-Allow_Origin", "*");
	res.header("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();

});

// Registering the routes middleware and this module only works for routes that begin with /todo.
// i.e. any request on a route starting with /todo is redirected to the routes module and the routes module
// will have the appropriate handlers to process the requests.
app.use("/todo", routes);


app.use("/error", function(req, res, next){
	var error = new Error("not found");
	error.status = 404;
	next(error);
});


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