// Note: the router module in the app.js strips away the /todo from the request and passes
// the remainging to this file where the appropriate route handler will kick in.
'use strict';

var express = require("express");
var router = express.Router();
var jsonParser = require("body-parser").json;


//route handlers

// URL: /todo
// GET handler
router.get("/", function(req, res) {
	res.json({response : "hello there, API works"});
});



// URL: /todo
// POST handler
router.post("/", function(req, res, next) {
	var name = "yolo!";
	res.json({name : " you have entered " + req.body.name});
});


//exporting the router to the main path
module.exports = router;