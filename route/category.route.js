import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategoryById } from "../controller/category.controller.js";

const router = Router();

router.post("/create", createCategory);
router.get("/get", getAllCategories);
router.get("/:categoryId", getCategoryById);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategoryById);

// blunder 

export default router;