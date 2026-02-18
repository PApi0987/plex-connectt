// ==========================
// Plex Connect Backend - db.js
// ==========================

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("❌ DATABASE_URL not defined in .env");
    }

    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🗄️ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("💥 MongoDB Connection Error:", error.message);
    // Retry after 5 seconds if connection fails
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
