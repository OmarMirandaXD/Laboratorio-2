import express from 'express';
import { createUser, createPost } from '../controllers/controller.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/posts', createPost);

export default router;
