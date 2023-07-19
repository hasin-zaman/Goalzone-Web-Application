const Joi=require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const teamAuthSchema=Joi.object({
    teamId: Joi.string().lowercase(),
    teamName: Joi.string().required().min(2),
    slogan: Joi.string(),
    establishedInYear: Joi.number().required().min(1947).max(new Date().getFullYear()),
    phone: Joi.number().required(),
    phoneStatus: Joi.string().required().valid("Public", "Private"),
    email: Joi.string().required(),
    emailStatus: Joi.string().required().valid("Public", "Private"),
    profileImage: Joi.string(),
    coverImage: Joi.string(),
    facebookHandle: Joi.string(),
    instaHandle: Joi.string(),
    status: Joi.string().required().valid('Active','Inactive')
});

module.exports={
    teamAuthSchema
};