const { BlogPost, PostCategory } = require('../models');

const createPost = ({ title, content, userId }) => BlogPost.create({ title, content, userId });

const createPostCategory = (array) => PostCategory
    .bulkCreate(array);

module.exports = {
    createPost,
    createPostCategory,
};