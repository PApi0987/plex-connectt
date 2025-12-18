// routes/vtuRoutes.js
import express from 'express';
import {
  purchaseData,
  purchaseAirtime,
  purchaseCable,
  purchaseElectricity
} from '../controllers/vtuController.js';

const router = express.Router();

// Data
router.post('/data', purchaseData);

// Airtime
router.post('/airtime', purchaseAirtime);

// Cable
router.post('/cable', purchaseCable);

// Electricity
router.post('/electricity', purchaseElectricity);

export default router;
