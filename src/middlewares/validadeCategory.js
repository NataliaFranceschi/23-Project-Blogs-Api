const Joi = require('joi');

const checkCategory = Joi.object({
    name: Joi.string().required(),
  }).required().messages({
    'any.required': '{#label} is required',
    'string.empty': '{#label} is required',
});

const validateName = async (req, res, next) => {
    const category = req.body;
    const { error } = checkCategory.validate(category);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
};

module.exports = validateName;