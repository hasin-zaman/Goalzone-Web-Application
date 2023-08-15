const validator = require('validator');

function webUrlValidation(url) {
    return validator.isURL(url, { require_protocol: true });
}

module.exports = webUrlValidation;
