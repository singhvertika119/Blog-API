import { Router } from "express";
import {
  signup,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

//Routes for creating a user
router.post("/signup", signup);
router.post("/login", login);
router.get("/all", authMiddleware, getAllUsers);
router.get("/:userId", getUserById);
router.put("/update/:userId", updateUserById);
router.delete("/:userId", authMiddleware, deleteUserById);

//Export the router
export default router;
