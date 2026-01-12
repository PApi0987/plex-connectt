// ==========================
// Plex Connect Backend - server.js
// ==========================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

// Routes
import vtuRoutes from "./routes/vtuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

// Load env vars
dotenv.config();

// Connect MongoDB
connectDB();

// Init app
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/vtu", vtuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);

// Root test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Plex Connect Backend is LIVE & Connected to DB"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🗄️ MongoDB connected`);
  console.log(`🔑 Paystack key loaded? ${!!process.env.PAYSTACK_SECRET_KEY}`);
});
