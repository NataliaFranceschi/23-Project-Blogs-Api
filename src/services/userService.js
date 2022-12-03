const { User } = require('../models');

const createUser = ({ displayName, email, password, _image }) => User
    .create({ displayName, email, password });

const getByEmail = ({ email }) => User.findOne({ where: { email } });

const getUsers = () => User.findAll({
    attributes: { exclude: ['password'] },
});

const getByUserId = (userId) => User.findByPk(userId, {
    attributes: { exclude: ['password'] },
});

const deleteUser = async (id) => {
    const post = await User.destroy(
      { where: { id } },
    );
  
    return post;
};  

module.exports = {
    createUser,
    getByEmail,
    getUsers,
    getByUserId,
    deleteUser,
};