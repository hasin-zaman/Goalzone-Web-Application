const validator = require('validator');

function emailValidation(email) {
    return validator.isEmail(email);
}

module.exports = emailValidation;
