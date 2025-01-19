import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controller/post.controller.js';

const router = Router();

//Routes for creating a post
router.post("/create", createPost);
router.get("/get", getAllPosts);
router.get("/:postId", getPostById);
router.put("/:postId", updatePostById);
router.delete("/:postId", deletePostById);

//Export the router
export default router;