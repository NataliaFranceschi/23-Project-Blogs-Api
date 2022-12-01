const express = require('express');
const userController = require('../controller/userController');
const { validateUser } = require('../middlewares/validateUser');

const router = express.Router();

router.post(
  '/',
  validateUser,
  userController.createUser,
);

router.get(
  '/',
  userController.getUsers,
);

module.exports = router;
