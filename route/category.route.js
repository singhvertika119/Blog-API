import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} from "../controller/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import checkRole from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["user", "admin"]),
  createCategory
);
router.get("/all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put(
  "/:categoryId",
  authMiddleware,
  checkRole(["user", "admin"]),
  updateCategory
);
router.delete(
  "/:categoryId",
  authMiddleware,
  checkRole(["user", "admin"]),
  deleteCategoryById
);

export default router;
