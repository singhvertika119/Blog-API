import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controller/post.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

//Routes for creating a post
router.post("/create",authMiddleware, createPost);
router.get("/all", getAllPosts);
router.get("/:postId", getPostById);
router.put("/:postId", authMiddleware, updatePostById);
router.delete("/:postId", authMiddleware, deletePostById);

//Export the router
export default router;