const { Category } = require('../models');

const createCategory = ({ name }) => Category.create({ name });

const getCategories = () => Category.findAll();

const getByCategoryId = (categoryId) => Category.findByPk(categoryId);

module.exports = {
    createCategory,
    getCategories,
    getByCategoryId,
};