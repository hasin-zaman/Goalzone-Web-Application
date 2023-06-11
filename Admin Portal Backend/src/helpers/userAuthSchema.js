const Joi=require('@hapi/joi');

const userAuthSchema=Joi.object({
    //firstName: Joi.string().required(),
    //lastName: Joi.string().required(),
    // age: Joi.number(),
    // gender: Joi.string().required().valid("Male", "Female"),
    phone: Joi.number().required().min(10),
    // phoneStatus: Joi.string().required().valid("Public", "Private"),
    // email: Joi.string().required(),
    // emailStatus: Joi.string().required().valid("Public", "Private"),
    // password: Joi.string().required().min(6),
    // bio: Joi.string(),
    // profileImage: Joi.string(),
    // coverImage: Joi.string(),
    // mostPreferredPosition: Joi.string(),
    // secondPreferredPosition: Joi.string(),
    // role: Joi.string().valid("Player", "Captain", "Ground-in-charge", "Admin"),
    // status: Joi.string().valid('Active','Inactive')
});

module.exports={
    userAuthSchema
};