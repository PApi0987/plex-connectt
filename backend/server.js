// ==========================
// Plex Connect Backend - server.js
// ==========================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Load environment variables
dotenv.config();

// Import routes
import vtuRoutes from "./routes/vtuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "*" })); // allow frontend
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/vtu", vtuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);

// Root route - test
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Plex Connect Backend is live and ready!"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 Paystack Secret Key loaded? ${!!process.env.PAYSTACK_SECRET_KEY}`);
});
