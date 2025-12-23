import express from "express";
import { getDataPlans, getAirtimeProviders, getCablePlans, getElectricityDiscos } from "../controllers/vtuController.js";

const router = express.Router();

router.get("/plans/data", getDataPlans);
router.get("/plans/airtime", getAirtimeProviders);
router.get("/plans/cable", getCablePlans);
router.get("/plans/electricity", getElectricityDiscos);

export default router;
