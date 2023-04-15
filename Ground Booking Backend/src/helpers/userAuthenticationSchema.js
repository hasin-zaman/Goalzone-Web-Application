const Joi=require('@hapi/joi');

const userAuthSchema=Joi.object({
    userId: Joi.number(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number(),
    gender: Joi.string().required().valid("Male", "Female"),
    phone: Joi.number().required().min(10),
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
    profileImage: Joi.string(),
    coverImage: Joi.string(),
    mostPreferredPosition: Joi.string(),
    secondPreferredPosition: Joi.string(),
    role: Joi.string().required().valid("Player", "Captain", "Ground-in-charge", "Admin"),
});

module.exports={
    userAuthSchema
};