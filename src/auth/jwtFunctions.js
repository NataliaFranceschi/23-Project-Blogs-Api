const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const createToken = (user) => {
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return token;
};

const verifyToken = (authorization) => {
    const payload = jwt.verify(authorization, secret);
    return payload;
};

module.exports = { createToken, verifyToken };