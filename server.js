import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
config();

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Blog!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
