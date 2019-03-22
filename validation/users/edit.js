const Validator = require("validator");
const isEmpty = require("../is-empty");
const common = require("../common");

module.exports = function validateEditInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";

    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "First name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = "Last name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if(!Validator.isISO8601(data.birthday)){
        errors.birthday = "Birthday field is invalid. Must be in yyyy-mm-dd format.";
    }

    if (Validator.isEmpty(data.birthday)) {
        errors.birthday = "Birthday field is required";
    }

    if(!common.GENDERS.includes(data.gender)){
        errors.gender = "Gender field is invalid. Must be one of " + common.GENDERS.join(", ");
    }

    if(Validator.isEmpty(data.gender)){
        errors.gender = "Gender field is required";
    }

    if(data.superUser !== true && data.superUser !== false){
        errors.superUser = "Super user field is invalid. Must be a boolean."
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
  };