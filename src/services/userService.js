const { User } = require('../models');

const createUser = ({ displayName, email, password, _image }) => User
    .create({ displayName, email, password });

const getByEmail = ({ email }) => User.findOne({ where: { email } });

const getUsers = () => User.findAll();

module.exports = {
    createUser,
    getByEmail,
    getUsers,
};