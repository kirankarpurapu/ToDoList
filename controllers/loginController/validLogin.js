'use strict';

var AWS = require('aws-sdk');
var database = require("../../aws/dynamodb.js");
var dynamodb = database.dynamodb;
var docClient = new AWS.DynamoDB.DocumentClient();
var table = database.userTable;
var userID = null;

var getUserIDIfLoginIsValid = 
function getUserIDIfLoginIsValid(username, password, callback) {
    var params = {
        TableName : table,
        KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username
            }
    };
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("LOGIN : Unable to query. Error:", JSON.stringify(err, null, 2));
            userID = null;
        } else {
            console.log("LOGIN : Query succeeded.");
            if(data.Items.length == 1) {
            	var item = data.Items[0];
            	console.log("LOGIN : Dynamo db found a match " + item.User_ID);
                if(item.password.localeCompare(password) == 0)
            	   userID = item.User_ID;
                else { 
                    console.log("LOGIN: wrong password");
                    userID = null;
                }
            }
            else {
            	console.log("LOGIN : dynamodb says the username/password combo is incorrect");
            	userID = null;
            }
        }
        callback(userID);
    });
};



module.exports = getUserIDIfLoginIsValid;