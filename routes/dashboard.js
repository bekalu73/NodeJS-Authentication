import mongoose from "mongoose";
import express from "express";
import { User } from "../models/auth.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, async function (req, res) {
  const user = await User.find().select("-password");

  res.send(user);
});
export default router;
