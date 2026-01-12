import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import {
  getAdminStats,
  getAllUsers,
  getAllTransactions
} from "../controllers/adminController.js";

const router = express.Router();

// Protect all routes
router.use(adminAuth);

// Dashboard stats
router.get("/stats", getAdminStats);

// List users
router.get("/users", getAllUsers);

// List transactions
router.get("/transactions", getAllTransactions);

export default router;
