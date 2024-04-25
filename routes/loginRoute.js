import express from "express";
import { User } from "../models/auth.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import _ from "lodash";

const router = express.Router();

router.post("/login", async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // Assuming generateAuthToken is a method in your User model to generate a token
    const token = await user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export default router;
