import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "../controller/post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";

const router = Router();

//Routes for creating a post
router.post("/create", authMiddleware, checkRole(["user"]), createPost);
router.get("/all", getAllPosts);
router.get("/:postId", getPostById);
router.put("/:postId", authMiddleware, checkRole(["user"]), updatePostById);
router.delete(
  "/:postId",
  authMiddleware,
  checkRole(["user", "admin"]),
  deletePostById
);

//Export the router
export default router;
