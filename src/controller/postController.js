const postService = require('../services/postService');

const createPost = async (req, res) => {
  const post = req.body;
  const { id } = req.user;

  const newPost = await postService.createPost({ ...post, userId: id });

  const array = post.categoryIds
    .map((category) => ({ postId: newPost.id, categoryId: category }));
  await postService.createPostCategory(array);

  return res.status(201).json(newPost);
};

const getPosts = async (_req, res) => {
  const allPosts = await postService.getPosts();

  return res.status(200).json(allPosts);
};

module.exports = {
    createPost,
    getPosts,
};