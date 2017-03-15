'user strict';
var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({profile: 'ToDoListKiran-account'});
AWS.config.credentials = credentials;


AWS.config.update({
	region : "us-east-1",
	endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var dynamodb = new AWS.DynamoDB();

module.exports.dynamodb = dynamodb;
module.exports.userTable = "UserTable";