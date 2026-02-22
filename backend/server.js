// ==========================
// Plex Connect Backend - PRO SERVER
// ==========================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

// ==========================
// ROUTES IMPORT
// ==========================
import vtuRoutes from "./routes/vtuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ==========================
// ENV CONFIG
// ==========================
dotenv.config();

// ==========================
// DATABASE CONNECTION
// ==========================
connectDB();

// ==========================
// EXPRESS APP
// ==========================
const app = express();

// ==========================
// SECURITY & MIDDLEWARE
// ==========================

// Parse JSON
app.use(express.json());

// CORS Protection
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Request Logger
app.use(
  morgan(
    process.env.NODE_ENV === "development"
      ? "dev"
      : "tiny"
  )
);

// ==========================
// HEALTH CHECK
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Plex Connect API",
    status: "ONLINE ✅",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

// ==========================
// API ROUTES
// ==========================
app.use("/api/users", userRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// ==========================
// GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR:", err.message);

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
  console.log(`
=====================================
🚀 PLEX CONNECT BACKEND STARTED
=====================================
🌐 Port: ${PORT}
🗄 MongoDB: ${!!process.env.DATABASE_URL}
💳 Paystack Ready: ${!!process.env.PAYSTACK_SECRET_KEY}
🔗 Frontend: ${process.env.FRONTEND_URL}
⚙️ Environment: ${process.env.NODE_ENV}
=====================================
`);
});
