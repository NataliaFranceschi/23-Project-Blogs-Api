const express = require('express');
const postController = require('../controller/postController');
const validateToken = require('../middlewares/validateToken');
const { validate, validateCategoryId } = require('../middlewares/validadePost');

const router = express.Router();

router.post(
  '/',
  validateToken,
  validate,
  validateCategoryId,
  postController.createPost,
);

module.exports = router;