import express from "express";
import { config } from "dotenv";
config();
import { connectDB } from "./config/db.js";
import { router } from "./route/user.route.js";

const app = express();

connectDB();

app.use(express.json());
app.use("/users", router);

app.get("/", (req, res) => {
    res.send("Welcome to the Blog!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
