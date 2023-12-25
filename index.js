import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/restaurantRoute.js";

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("testing");
});

app.use("/restaurant", router);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
