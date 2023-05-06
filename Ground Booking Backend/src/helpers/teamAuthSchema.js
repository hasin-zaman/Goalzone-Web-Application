const Joi=require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const teamAuthSchema=Joi.object({
    teamId: Joi.string().lowercase(),
    teamName: Joi.string().required().min(2),
    establishedInYear: Joi.string().length(4).regex(/^\d+$/),
    phone: Joi.number().required().min(10),
    email: Joi.string().required(),
    profileImage: Joi.string(),
    coverImage: Joi.string(),
    facebookHandle: Joi.string(),
    instaHandle: Joi.string(),
    captain: Joi.objectId(),
    players: Joi.array().items(Joi.objectId())
});

module.exports={
    teamAuthSchema
};