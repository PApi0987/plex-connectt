// ==========================
// Plex Connect Backend - adminController.js
// ==========================
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        apiKey: admin.apiKey,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "❌ Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
