import mongoose from "mongoose";
import express from "express";
import { User, validate } from "../models/auth.js";
import bcrypt from "bcrypt";
import _ from "lodash";
const router = express.Router();

router.post("/register", async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  user.password = password;

  await user.save();
  const token = user.generateAuthToken();
  res
    .setHeader("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});
export default router;
