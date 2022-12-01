const express = require('express');
const categoryController = require('../controller/categoryController');
const validateName = require('../middlewares/validadeCategory');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  validateName,
  categoryController.createCategory,
);

module.exports = router;