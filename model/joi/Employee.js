const Joi = require('joi');

const empSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow(""),
    firstName: Joi.string()
        .min(2)
        .max(60)
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required(),
    telephone: Joi.number()
        .min(2)
        .max(6)
        .required(),
    email: Joi.string()
        .email()
        .required()
});

module.exports = empSchema;

