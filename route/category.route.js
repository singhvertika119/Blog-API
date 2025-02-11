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
  checkRole(["author", "admin"]),
  createCategory
);
router.get("/all", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put(
  "/:categoryId",
  authMiddleware,
  checkRole(["author", "admin"]),
  updateCategory
);
router.delete(
  "/:categoryId",
  authMiddleware,
  checkRole(["author", "admin"]),
  deleteCategoryById
);

export default router;
