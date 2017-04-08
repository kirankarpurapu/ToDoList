'use strict';

function validateUserOnBoarding(req) {
	req.checkBody("firstname", "Enter a valid firstname.").isLength({min : 1, max :20});
	req.checkBody("lastname", "Enter a valid lastname.").optional().isLength({min : 1, max :20});
	req.checkBody("phoneNumber", "Enter a valid phoneNumber.").isNumber().isLength({min : 1, max :20});
	req.checkBody("address 1", "Enter a valid address1.").isLength({min : 1, max :20});
  req.checkBody("address 2", "Enter a valid address2.").isLength({min : 1, max :20});
  req.checkBody("city", "Enter a valid city.").isLength({min : 1, max :20});
  req.checkBody("state", "Enter a valid state.").isLength({min : 1, max :20});
  req.checkBody("zipcode", "Enter a valid zipcode.").isNumber().isLength({min : 1, max :20});
  req.checkBody("country", "Enter a valid country.").isLength({min : 1, max :20});

	var errors = req.validationErrors();
	return errors;
}

module.exports = validateUserOnBoarding; 
