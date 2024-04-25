import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
}
export default authMiddleware;
