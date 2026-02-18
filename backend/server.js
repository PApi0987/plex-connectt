// ==========================
// Plex Connect Backend - server.js (Advanced)
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

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ==========================
// MIDDLEWARE
// ==========================

// Enable JSON parsing
app.use(express.json());

// CORS: only allow frontend URL or fallback to all
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// HTTP request logger (dev/prod)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}

// ==========================
// ROUTES
// ==========================
app.use("/api/vtu", vtuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);

// Root route (health check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "🚀 Plex Connect Backend is LIVE & connected to DB",
    env: process.env.NODE_ENV,
  });
});

// ==========================
// ERROR HANDLING
// ==========================

// 404 Route
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "❌ Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// ==========================
// SERVER START
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🗄️ MongoDB connected: ${!!process.env.DATABASE_URL}`);
  console.log(`🔑 Paystack key loaded: ${!!process.env.PAYSTACK_SECRET_KEY}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});
