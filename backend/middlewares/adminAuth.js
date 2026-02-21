// ==========================
// Plex Connect - adminAuth.js
// ==========================

import dotenv from "dotenv";

dotenv.config();

export const adminProtect = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        message: "Admin API key required",
      });
    }

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({
        message: "Invalid Admin API key",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Admin authorization failed",
    });
  }
};
