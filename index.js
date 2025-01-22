import express from "express";
import { router } from "./route/user.route.js";
import postRouter from "./route/post.route.js";
import categoryRouter from "./route/category.route.js";

const app = express();

app.use(express.json());
app.use("/users", router);
app.use("/posts", postRouter);
app.use("/category", categoryRouter);


//Export the router
export default app;