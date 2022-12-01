const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    return res.status(201).json(newCategory);
  };

const getCategories = async (_req, res) => {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
};
module.exports = {
    createCategory, 
    getCategories,
};
