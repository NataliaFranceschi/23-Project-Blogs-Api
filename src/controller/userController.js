const userService = require('../services/userService');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (req, res) => {
    const user = req.body;
    const email = await userService.getByEmail(user);
    if (email) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await userService.createUser(user);
    if (newUser) {
      const token = createToken(user);
      return res.status(201).json({ token });
    }
  };

const Login = async (req, res) => {
    const user = req.body;
    const login = await userService.getByEmail(user);

    if (!login || login.password !== user.password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  
    const token = createToken(user);
    return res.status(200).json({ token });
  };

  const getUsers = async (_req, res) => {
      const users = await userService.getUsers();
      const usersWithoutPassword = users.map((user) => {
        const { password: _, ...userWithoutPassword } = user.dataValues;
        return userWithoutPassword;
      });
      return res.status(200).json(usersWithoutPassword);
  };

  const getByUserId = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getByUserId(id);
    if (user) {
      const { password: _, ...userWithoutPassword } = user.dataValues;
      return res.status(200).json(userWithoutPassword);
    }
    return res.status(404).json({ message: 'User does not exist' });
};

module.exports = {
    createUser,
    Login,
    getUsers,
    getByUserId,
};
