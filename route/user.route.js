import { Router } from "express";
import {
  signup,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
  logout,
  getCurrentUser,
  updateCurrentUser,
} from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";

const router = Router();

//Routes for creating a user
router.post("/signup", signup);
router.post("/login", login);
router.get("/currentUser", authMiddleware, getCurrentUser),
  router.post("/logout", logout);
router.get("/all", authMiddleware, checkRole(["admin"]), getAllUsers);
router.get("/:userId", getUserById);
router.put(
  "/update/:userId",
  authMiddleware,
  checkRole(["admin"]),
  updateUserById
);
router.put("/updateCurrentUser", authMiddleware, updateCurrentUser);
router.delete(
  "/:userId",
  authMiddleware,
  checkRole(["user", "admin"]),
  deleteUserById
);

//Export the router
export default router;
