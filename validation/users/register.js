const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";

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

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
  };