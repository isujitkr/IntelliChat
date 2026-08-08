import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Auth is running");
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});

connectDB();