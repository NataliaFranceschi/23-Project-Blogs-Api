const Joi = require('joi');
const categoryService = require('../services/categoryService');

const checkPost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).required().messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});

const validate = async (req, res, next) => {
    const post = req.body;
    const { error } = checkPost.validate(post);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
};

const validateCategoryId = async (req, res, next) => {
    const { categoryIds } = req.body;
    const verifyCategory = await Promise.all(categoryIds
    .map((id) => categoryService.getByCategoryId(id)));
    const allValidaded = verifyCategory.every((item) => item !== null);
    if (!allValidaded) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
  
    next();
};

module.exports = {
    validate,
    validateCategoryId,
};