const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();

const dbConnect = require("./config/database");
const router = require("./Routes/Route");
const messageRouter = require("./Routes/MessageRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",  // Client origin
    credentials: true,
  })
);

// Database Connection
dbConnect();

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1", router);
app.use("/api/v1/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

// Socket.IO setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map to track online users
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Add user to onlineUsers map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User added: ${userId}`);
  });

  // Send message to specific user
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-receive", data.message);
      // console.log(`Message sent from ${data.from} to ${data.to}: ${data.message}`);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
        console.log(`User removed: ${key}`);
      }
    });
  });

  // Handle connection error
  socket.on("connect_error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });
});
