import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  fundWallet,
  verifyWalletFunding,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/fund", protect, fundWallet);
router.get("/verify/:reference", verifyWalletFunding);

export default router;
