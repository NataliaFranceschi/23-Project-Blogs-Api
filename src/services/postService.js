const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = ({ title, content, userId }) => BlogPost.create({ title, content, userId });

const createPostCategory = (array) => PostCategory
    .bulkCreate(array);

const getPosts = () => {
    const posts = BlogPost.findAll({
        attributes: { exclude: ['userId'] },
        include: [{ model: User, as: 'users', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
        
    });
    return posts;
};

module.exports = {
    createPost,
    createPostCategory,
    getPosts,
};