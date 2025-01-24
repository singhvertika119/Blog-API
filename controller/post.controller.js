import { Post } from "../model/post.model.js";
import mongoose from "mongoose";
import {
  validatePost,
  validatePostUpdate,
} from "../validator/post.validator.js";

//Create new post
const createPost = async (req, res) => {
  try {
    const { error } = validatePost(req.body);
    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { title, content, author, category } = req.body;

    //Create new post
    const post = await Post.create({ title, content, author, category });

    return res.status(201).json({ message: "Post created succesfully", post });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email category")
      .sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    return req.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get post by ID
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId).populate(
      "author",
      "name email category"
    );

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

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Post ID is invalid" });
    }

    const updatedPost = {
      title,
      content,
    };

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Post updated successfully", data: post });
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

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Post ID is invalid" });
    }

    await Post.findByIdAndDelete(postId);

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
