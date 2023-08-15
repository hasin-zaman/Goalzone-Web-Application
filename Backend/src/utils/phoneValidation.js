async function phoneValidation(phone) {
    
    if (isNaN(phone)) {
        return false;
    }

    const length = phone.toString().length;
    
    return length >= 7 && length <= 20;
}

module.exports = phoneValidation;
