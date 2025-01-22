import userRouter from "./user.route.js";
import postRouter from "./post.route.js"
import categoryRouter from "./category.route.js"

import express from 'express'

const app = express()
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);


export default app;