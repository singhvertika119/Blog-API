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
import checkRole from "../middleware/role.middleware.js";

const router = Router();

//Routes for creating a user
router.post("/signup", signup);
router.post("/login", login);
router.get("/all", authMiddleware, checkRole(["admin"]), getAllUsers);
router.get("/:userId", getUserById);
router.put("/update/:userId", checkRole(["author"]), updateUserById);
router.delete(
  "/:userId",
  authMiddleware,
  checkRole(["admin", "author"]),
  deleteUserById
);

//Export the router
export default router;
