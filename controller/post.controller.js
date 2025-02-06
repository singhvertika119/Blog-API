import { Post } from "../model/post.model.js";
import mongoose from "mongoose";
import {
  validatePost,
  validatePostUpdate,
} from "../validator/post.validator.js";
import asyncHandler from "../utils/asyncHandler.js";
import { query } from "express";

//Create new post
const createPost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { title, content, category } = req.body;
    const author = req.user._id;

    //Create new post
    const post = await Post.create({ title, content, author, category });

    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name email"
    );

    return res
      .status(201)
      .json({ message: "Post created succesfully", data: populatedPost });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get all posts
const getAllPosts = asyncHandler(async (req, res) => {
  try {
    let { search, page = 1, limit = 5 } = req.query;
    page = Number(page);
    limit = Number(limit);

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    const posts = await Post.find(query)
      .populate("author", "name email ")
      .populate("category", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    return res.status(200).json({ posts, currentPage: page });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

//Get post by ID
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Update post by ID
const updatePostById = async (req, res) => {
  try {
    const { error } = validatePostUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Post ID is invalid" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userRole !== "admin" && post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    const updatedPost = {
      title,
      content,
    };

    const newPost = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
    }).populate("author", "name email");

    return res
      .status(200)
      .json({ message: "Post updated successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Delete post by ID
const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Post ID is invalid" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (userRole !== "admin" && post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Export
export { createPost, getAllPosts, getPostById, updatePostById, deletePostById };
