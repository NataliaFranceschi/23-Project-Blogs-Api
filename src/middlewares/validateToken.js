const { verifyToken } = require('../auth/jwtFunctions');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    await verifyToken(token);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};