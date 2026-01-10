import express from "express";
import { buyData, buyAirtime, buyCable, buyElectricity } from "../controllers/vtuController.js";

const router = express.Router();

router.post("/data", buyData);
router.post("/airtime", buyAirtime);
router.post("/cable", buyCable);
router.post("/electricity", buyElectricity);

export default router;
