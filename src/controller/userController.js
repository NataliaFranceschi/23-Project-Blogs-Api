const userService = require('../services/userService');
const { createToken, verifyToken } = require('../auth/jwtFunctions');

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

  const getUsers = async (req, res) => {
    const { authorization } = req.headers;
    const payload = verifyToken(authorization);
    if (payload) {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    }
  };

module.exports = {
    createUser,
    Login,
    getUsers,
};
