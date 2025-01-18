import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        trype: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export { Post };