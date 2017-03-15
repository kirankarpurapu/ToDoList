'use strict';

function validateUserSignup(req) {
	req.checkBody("username", "Enter a valid username.").isLength({min : 1, max :20});
	req.checkBody("name", "Enter a valid name.").optional().isLength({min : 1, max :20});
	req.checkBody("password", "Enter a valid password.").isLength({min : 1, max :20});
	req.checkBody("email", "Enter a valid email.").optional().isEmail();

	var errors = req.validationErrors();
	return errors;
}

module.exports = validateUserSignup; 