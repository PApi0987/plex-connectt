import express from "express";
import {
  getWallet,
  fundWallet,
  getTransactions,
} from "../controllers/walletController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWallet);
router.post("/fund", protect, fundWallet);
router.get("/transactions", protect, getTransactions);

export default router;
