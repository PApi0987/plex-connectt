import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel.js";

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const exists = findUserByEmail(email);
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const user = await createUser({ name, email, password });
  const token = generateToken(user.id);

  res.status(201).json({ status: true, user: { id: user.id, name, email }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user.id);
  res.status(200).json({ status: true, user: { id: user.id, name: user.name, email }, token });
};
