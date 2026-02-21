import express from "express";
import {
  buyAirtime,
  buyData,
  buyElectricity,
  subscribeCable,
} from "../controllers/vtuController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
================================
VTU SERVICES ROUTES
================================
*/

// 📞 Airtime
router.post("/airtime", protect, buyAirtime);

// 📡 Data
router.post("/data", protect, buyData);

// ⚡ Electricity Bills
router.post("/electricity", protect, buyElectricity);

// 📺 Cable TV Subscription
router.post("/cable", protect, subscribeCable);

export default router;
