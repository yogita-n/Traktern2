import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password,role,mentor_id } = req.body;

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password_hash: hashed,
    role:"mentor",
    mentor_id: role === "intern" ? mentor_id : null
  });

  return res.json({
    message: "User registered",
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      role: user.role,
      name: user.name
    }
  });
};
