const express = require('express');
const userController = require('../controller/userController');
const { validateLogin } = require('../middlewares/validateUser');

const router = express.Router();

router.post(
  '/',
  validateLogin,
  userController.Login,
);

module.exports = router;