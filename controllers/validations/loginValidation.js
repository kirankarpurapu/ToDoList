'use strict';

function validateUserLogin(req) {
	req.checkBody("username", "Enter a valid username.").isLength({min : 1, max :20});
	req.checkBody("password", "Enter a valid password.").isLength({min : 1, max :20});
	var errors = req.validationErrors();
	return errors;
}

module.exports = validateUserLogin; 