const Joi=require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const groundAuthSchema=Joi.object({
    groundId: Joi.string().lowercase(),
    groundName: Joi.string().required().min(2),
    establishedInYear: Joi.number().required().min(1947).max(new Date().getFullYear()),
    type: Joi.string().required(),
    area: Joi.string().required(),
    address: Joi.string().required(),
    mapLink: Joi.string(),
    mapImage: Joi.string(),
    additionalInfo: Joi.string(),
    phone: Joi.number().required().min(10),
    email: Joi.string().required(),
    webUrl: Joi.string(),
    profileImage: Joi.string(),
    coverImage: Joi.string(),
    facebookHandle: Joi.string(),
    instaHandle: Joi.string(),
    images: Joi.array().items(Joi.string()),
    incharges: Joi.array().items(Joi.objectId()),
    reviews: Joi.array().items(Joi.objectId()),
    //slots: Joi.array().items({slotId: Joi.number().required(), startTime: Joi.String().required(), endTime: Joi.String().required(), bookingFee: Joi.number().required(), slotStatus: Joi.string().required().valid('Open','Closed','Selected')}),
    status: Joi.string().required().valid('Active','Inactive','Pending-approval')
});

module.exports={
    groundAuthSchema
};