import userRouter from "./user.route.js";
import postRouter from "./post.route.js";
import categoryRouter from "./category.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { notFound } from "../middleware/notFound.middleware.js";
import express from "express";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/users", userRouter);
app.use("/posts", authMiddleware, postRouter);
app.use("/categories", authMiddleware, categoryRouter);

app.use(notFound);

export default app;
