
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import dns from "dns";

import chatRoutes from "./routes/chat.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 8080;

app.use(express.json());


app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE"],
    credentials:true
}));

app.use("/api", chatRoutes);
app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
