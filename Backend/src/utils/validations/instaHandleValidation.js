function instaHandleValidation(link) {
    const regex = /^https:\/\/www\.instagram\.com\/[^\s]+$/;
    return regex.test(link);
}

module.exports = instaHandleValidation;
