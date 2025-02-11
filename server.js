import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "dotenv";
config();
import viewsRouter from "./route/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

connectDB();

//Create a HTTP server
const server = createServer(app);

//Create a new instance of socket.io by passing the HTTP server object
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cookieParser());

//to make io available in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

//listen for client connection
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("newPost", (post) => {
    io.emit("newPost", post);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use("/", viewsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
