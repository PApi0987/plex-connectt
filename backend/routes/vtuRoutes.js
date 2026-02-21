import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  buyAirtimeController,
  buyDataController,
  buyElectricityController,
  buyCableController,
} from "../controllers/vtuController.js";

const router = express.Router();

router.post("/airtime", protect, buyAirtimeController);
router.post("/data", protect, buyDataController);
router.post("/electricity", protect, buyElectricityController);
router.post("/cable", protect, buyCableController);

export default router;
