const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = await categoryService.createCategory(category);
    return res.status(201).json(newCategory);
  };

module.exports = {
    createCategory, 
};
