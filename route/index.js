import userRouter from "./user.route.js";
import postRouter from "./post.route.js";
import categoryRouter from "./category.route.js";
import authRoute from "./auth.route.js";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/categories", categoryRouter);
router.use("/token", authRoute);

export default router;
