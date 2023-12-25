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

app.use(
  cors({
    origin: "https://challenge-level2-b-frontend.vercel.app",
  })
);

app.get("/test", (req, res) => {
  res.send("testing");
});

app.use("/restaurant", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
