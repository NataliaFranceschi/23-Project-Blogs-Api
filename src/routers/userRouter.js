const express = require('express');
const userController = require('../controller/userController');
const { validateUser } = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateUser,
  userController.createUser,
);

router.get(
  '/',
  validateToken,
  userController.getUsers,
);

module.exports = router;
