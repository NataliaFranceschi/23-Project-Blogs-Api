const Joi = require('joi');

const checkLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required().messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});

const checkUser = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  }).required().messages({
    'any.required': '{#label} is required',
    'string.min': '{#label} length must be at least {#limit} characters long',
    'string.email': '{#label} must be a valid email',
});

const validate = async (req, res, next, check) => {
    const user = req.body;
    const { error } = check.validate(user);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
};

const validateLogin = async (req, res, next) => {
    validate(req, res, next, checkLogin);
};

const validateUser = async (req, res, next) => {
    validate(req, res, next, checkUser);
};

module.exports = {
    validateUser,
    validateLogin,
};