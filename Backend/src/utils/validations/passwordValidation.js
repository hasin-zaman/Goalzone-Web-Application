function passwordValidation(password) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const isMinLength = password.length >= 8;

    return hasLowercase && hasUppercase && hasDigit && isMinLength;
}

module.exports = passwordValidation;
