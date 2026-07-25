import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import dns from "dns";

import chatRoutes from "./routes/chat.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-gink.onrender.com",
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Request logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.use("/api", chatRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

// Start Server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});