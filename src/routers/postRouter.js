const express = require('express');
const postController = require('../controller/postController');
const validateToken = require('../middlewares/validateToken');
const { validatePost, validateUpdate,
   validateCategoryId, validatePostUser } = require('../middlewares/validadePost');

const router = express.Router();

router.post(
  '/',
  validateToken,
  validatePost,
  validateCategoryId,
  postController.createPost,
);

router.get(
  '/',
  validateToken,
  postController.getPosts,
);

router.get(
  '/:id',
  validateToken,
  postController.getPostById,
);

router.put(
  '/:id',
  validateToken,
  validatePostUser,
  validateUpdate,
  postController.updatePost,
);

module.exports = router;