import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import register from "./routes/registerRoute.js";
import login from "./routes/loginRoute.js";
import dashboard from "./routes/dashboard.js";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", register);
app.use("/api/users", login);
app.use("/api/users", dashboard);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
