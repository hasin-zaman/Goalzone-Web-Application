//accepts strings lh, isl, khi1
async function cityIdValidation(cityId) {
    const regex = /^[a-z]{2,3}\d{0,1}$/;
    return regex.test(cityId);
}

module.exports=cityIdValidation;