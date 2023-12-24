function facebookHandleValidation(link) {
    const regex = /^https:\/\/www\.facebook\.com\/[^\s]+$/;
    return regex.test(link);
}

module.exports = facebookHandleValidation;
