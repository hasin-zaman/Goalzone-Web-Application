async function ageValidation(age) {
    
    if (isNaN(age)) {
        return false;
    }
    
    return age >= 1 && age <= 100;
}

module.exports = ageValidation;