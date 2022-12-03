const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = ({ title, content, userId }) => BlogPost.create({ title, content, userId });

const createPostCategory = (array) => PostCategory
    .bulkCreate(array);

const getPosts = () => {
    const posts = BlogPost.findAll({
        attributes: { exclude: ['userId'] },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
        
    });
    return posts;
};

const getPostById = (postId) => {
    const posts = BlogPost.findByPk(postId, {
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
        
    });
    return posts;
};

const updatePost = async (id, title, content) => {
    const [updatedPost] = await BlogPost.update(
      { title, content },
      { where: { id } },
    );
    
    return updatedPost;
};  

const deletePost = async (id) => {
    const post = await BlogPost.destroy(
      { where: { id } },
    );
  
    return post;
};  

const searchPosts = async (q) => {
    const posts = await BlogPost.findAll({
        where: { [Op.or]: [{ 
          title: { [Op.substring]: q }, 
        }, { 
          content: { [Op.substring]: q },
        }] },
        attributes: { exclude: ['userId'] },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
      });
    return posts;
}; 

module.exports = {
    createPost,
    createPostCategory,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
};