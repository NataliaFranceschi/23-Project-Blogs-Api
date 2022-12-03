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
  '/search',
  validateToken,
  postController.searchPosts,
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

router.delete(
  '/:id',
  validateToken,
  validatePostUser,
  postController.deletePost,
);

module.exports = router;