// Note: the router module in the app.js strips away the /todo from the request and passes
// the remainging to this file where the appropriate route handler will kick in.
'use strict';

var colors = require('colors')
var express = require("express");
var jsonParser = require("body-parser").json;
var router = express.Router();
var validateUserLogin = require("../controllers/validations/loginValidation.js");
var validateUserSignup = require("../controllers/validations/signupValidation.js");
***KIRAN*** var validateUserOnBoarding = require("../controllers/validations/onBoardingValidation.js");
var getUserIDIfLoginIsValid = require("../controllers/loginController/validLogin.js");
var createUserAndGetID = require("../controllers/signupController/validSignup.js");
***KIRAN*** getUserIDgivenUserToken = require("../controllers/loginController/validLogin.js").getUserIDgivenUserToken;
***KIRAN*** getUserOnBoardingDetailsForUser = require("../controllers/onBoardingController/getUserOnboardDetails.js");
//route handlers

// URL: /todo
// GET handler
router.get("/", function(req, res) {
  console.log("hello".green);
	res.json({response : "hello there, API works"});
});


// URL: /todo/login
// POST handler
router.post("/login", function(req, res, next) {
	var errors = validateUserLogin(req);
  if (errors) {
  	console.log("LOGIN: error in the post body in the login route");
    res.send(errors);
  } else {
  	var username = req.body.username, password = req.body.password;
  	getUserIDIfLoginIsValid(username, password, function callback(userID) {
  	if(userID == null) {
  		console.log("LOGIN: wrong username/password");
  		res.json({
  			"message" : "LOGIN: Invalid username or password"
  		});
  	}
  	else {
  		console.log("LOGIN : Correct username and password");
  		res.json({
  			"message" : "LOGIN : logged in successfully",
  			"username" : username,
  			"userID" : userID
  		});
  	}
  	});
  }
});



// URL: /todo/signup
// POST handler
router.post("/signup", function(req, res, next) {
	var errors = validateUserSignup(req);
  if (errors) {
  	console.log("LOGIN: error in the post body in the signup route");
    res.send(errors);
  } else {
  	var username = req.body.username, password = req.body.password;
  	var email = req.body.email, name = req.body.name;
  	createUserAndGetID(username, password, name, email, function callback(userID) {
  	if(userID == null) {
  		console.log("SIGNUP: user aleady exists");
  		res.json({
  			"message" : "SIGNUP: Please choose a different username"
  		});
  	}
  	else {
  		console.log("SIGNUP : SignedUp Successfully");
  		res.json({
  			"message" : "SIGNUP : signed up successfully",
  			"username" : username,
  			"userID" : userID
  		});
  	}
  	});
  }
});


// URL: /todo/onboarding
// POST handler
router.post("/onboarding", function(req, res, next) {
	var errors = validateUserOnBoarding(req);
  if (errors) {
  	console.log("ONBOARDING: error in the post body in the onboarding route");
    res.send(errors);
  } else {
	var userToken = req.body.userToken;
	var userID = getUserIDgivenUserToken(userToken);
	var userDetailsJSON = getUserOnBoardingDetailsForUser(req);  
	// add this userDetails JSON in the POSTGRES Database here.  
  }
});

//exporting the router to the main path
module.exports = router;
