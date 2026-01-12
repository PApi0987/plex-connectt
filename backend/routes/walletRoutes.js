import express from "express";
import { verifyPaystackPayment } from "../controllers/walletController.js";

const router = express.Router();

router.post("/paystack", verifyPaystackPayment);

export default router;
