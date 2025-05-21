import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT || 4002;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Order service is running`);
});
