const userService = require('../services/userService');
const { createToken } = require('../auth/jwtFunctions');

const Login = async (req, res) => {
    const user = req.body;
    const login = await userService.getByEmail(user);

    if (!login || login.password !== user.password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
  
    const token = createToken(user);
    return res.status(200).json({ token });
  };

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

  const getUsers = async (_req, res) => {
      const users = await userService.getUsers();
      return res.status(200).json(users);
  };

  const getByUserId = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getByUserId(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User does not exist' });
};

const deleteUser = async (req, res) => {
  const { param } = req.params;
  const { id } = req.user;
  if (param === 'me') {
  await userService.deleteUser(id);
  return res.status(204).end();
  }
};

module.exports = {
    createUser,
    Login,
    getUsers,
    getByUserId,
    deleteUser,
};
