import express from "express";

import {
  buyAirtimeController,
  buyDataController,
  buyElectricityController,
  buyCableController,
} from "../controllers/vtuController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Airtime
router.post("/airtime", protect, buyAirtimeController);

// Data
router.post("/data", protect, buyDataController);

// Electricity
router.post("/electricity", protect, buyElectricityController);

// Cable TV
router.post("/cable", protect, buyCableController);

export default router;
