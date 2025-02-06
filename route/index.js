import userRouter from "./user.route.js";
import postRouter from "./post.route.js";
import categoryRouter from "./category.route.js";
import express from "express";

const router = express.Router();



router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);

export default router;
