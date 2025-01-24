import { Category } from "../model/category.model.js";
import mongoose from "mongoose";
import {
  validateCreate,
  validateUpdate,
} from "../validator/category.validator.js";

//Create new categoty
const createCategory = async (req, res) => {
  try {
    const { error } = validateCreate(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, description });

    return res
      .status(201)
      .json({ message: "Category created succesfully", category });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Update category by ID
const updateCategory = async (req, res) => {
  try {
    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    const { categoryId } = req.params;
    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }

    const updateCategory = {
      name,
      description,
    };

    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateCategory,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Category updated", data: category });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Delete category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }

    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Export
export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
