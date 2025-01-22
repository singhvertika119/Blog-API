import app from "./route/index.js";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
config();



connectDB();

// app.use(express.json());
// app.use("/users", router);
// app.use("/posts", postRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Blog!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
