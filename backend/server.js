// ==========================
// PLEX CONNECT PRO SERVER
// ==========================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

// ROUTES
import vtuRoutes from "./routes/vtuRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// ==========================
// DATABASE
// ==========================
connectDB();

const app = express();

// ==========================
// MIDDLEWARE
// ==========================
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(
  morgan(
    process.env.NODE_ENV === "development"
      ? "dev"
      : "combined"
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
    uptime: process.uptime(),
    time: new Date(),
  });
});

// ==========================
// ROUTES
// ==========================
app.use("/api/users", userRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// ==========================
// 404
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ==========================
// GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Server Error"
        : err.message,
  });
});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
=====================================
🚀 PLEX CONNECT BACKEND RUNNING
=====================================
🌐 Port: ${PORT}
🗄 MongoDB: CONNECTED
💳 Paystack: ${!!process.env.PAYSTACK_SECRET_KEY}
⚙️ Environment: ${process.env.NODE_ENV}
=====================================
`);
});
