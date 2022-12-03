const express = require('express');
const postController = require('../controller/postController');
const validateToken = require('../middlewares/validateToken');
const { validatePost, validateUpdate, validatePostId,
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
  validatePostId,
  validateToken,
  postController.getPostById,
);

router.put(
  '/:id',
  validateToken,
  validateUpdate,
  validatePostUser,
  postController.updatePost,
);

router.delete(
  '/:id',
  validateToken,
  validatePostUser,
  postController.deletePost,
);

module.exports = router;