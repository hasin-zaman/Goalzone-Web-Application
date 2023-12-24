function nameValidation(name) {
    const nameRegex = /^[A-Za-z.\s]+$/;
    return nameRegex.test(name);
}

module.exports=nameValidation;
