const { verifyToken } = require('../auth/jwtFunctions');
const { getByEmail } = require('../services/userService');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = await verifyToken(token);
    const user = await getByEmail(decoded.data);
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};