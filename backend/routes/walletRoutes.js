import express from "express";
import { fundWallet } from "../controllers/walletController.js";

const router = express.Router();

router.post("/fund", fundWallet);

export default router;
