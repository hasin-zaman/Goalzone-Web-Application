function establishedInYearValidation(value) {
    const currentYear = new Date().getFullYear();
    return value >= 1947 && value <= currentYear;
}

module.exports = establishedInYearValidation;
