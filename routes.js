// Note: the router module in the app.js strips away the /todo from the request and passes
// the remainging to this file where the appropriate route handler will kick in.
'use strict';

var express = require("express");
var AWS = require('aws-sdk');
var jsonParser = require("body-parser").json;

var router = express.Router();
var credentials = new AWS.SharedIniFileCredentials({profile: 'ToDoListKiran-account'});
AWS.config.credentials = credentials;


AWS.config.update({
	region : "us-east-1",
	endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

//route handlers

// URL: /todo
// GET handler
router.get("/", function(req, res) {
	res.json({response : "hello there, API works"});
});


// URL: /todo/addRow
// POST handler
router.post("/addRow", function(req, res) {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var table="UserTable";
	var User_ID = "1238";
	var year = 2015;
	var title = "The Big New Movie";
	var params = {
	    TableName:table,
	    Item:{
	    	"User_ID" : User_ID,
	        "year": year,
	        "title": title,
	        "info":{
	            "plot": "Nothing happens at all.",
	            "rating": 0
	        }
	    }
	};

	console.log("Adding a new item...");
	docClient.put(params, function(err, data) {
	    if (err) {
	        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("Added item:", JSON.stringify(data, null, 2));
	    }
	});
	res.json({response : "added the row"});
});


// URL: /todo
// POST handler
router.post("/", function(req, res, next) {
	var name = "yolo!";
	res.json({name : " you have entered " + req.body.name});
});


//exporting the router to the main path
module.exports = router;