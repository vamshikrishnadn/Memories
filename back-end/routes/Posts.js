import express from 'express';
import auth from '../middleware/auth.js';

import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  fetchPost,
  getPostBySearch,
} from '../controllers/Posts.js';

const router = express.Router();

router.get('/', fetchPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.get('/search', getPostBySearch);
router.get('/:id', fetchPost);

export default router;
