import router from "./route/index.js";
import express from "express";
import { notFound } from "./middleware/notFound.middleware.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(router);

app.use(notFound);

export default app;
