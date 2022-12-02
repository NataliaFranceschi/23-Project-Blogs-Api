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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await postService.updatePost(id, title, content);
  const updatedPost = await postService.getPostById(id);

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);
  return res.status(204).end();
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
};