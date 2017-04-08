'use strict';

var AWS = require('aws-sdk');
var database = require("../../aws/dynamodb.js");
const uuid = require('uuid/v1');
var dynamodb = database.dynamodb;
var docClient = new AWS.DynamoDB.DocumentClient();
var table = database.userTable;
var userID = null;

var createUser = 
function createUser(username, password, name, email, callback) {
    var params = {
        TableName : table,
        KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username
            }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error(" SIGNUP: Unable to query. Error:", JSON.stringify(err, null, 2));
            return;
        } else {
            if(data.Items.length == 1) {
                // user already exists
                console.log("SIGNUP: user already exists");
                userID = null;
            }
            else {
                // user doesnt exist, creating a new user
            	console.log("SIGNUP : creating a new user");
                userID = uuid();
     
                var params = {
                    TableName:table,
                    Item:{
                        "name": name,
                        "username": username,
                        "email" : email,
                        "password" : password,
                        "User_ID" : userID
                    }
                };
                docClient.put(params, function(err, data) {
                    if (err) {
                        console.error("SIGNUP : Unable to add a new user. Error JSON:", JSON.stringify(err, null, 2));
                        userID = null;
                    } else {
                        console.log("SIGNUP : Added a new user:", JSON.stringify(data, null, 2));
                    }
                });    
            }
            callback(userID);
        }
    });
};

module.exports = createUser;