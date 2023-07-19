const Joi=require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const cityAuthSchema=Joi.object({
    cityId: Joi.string().lowercase().required(),
    cityName: Joi.string().required().min(2),
    image: Joi.string().required(),
    grounds: Joi.array().items(Joi.objectId()),
    status: Joi.string().required().valid('Active','Inactive')
});

module.exports={
    cityAuthSchema
};