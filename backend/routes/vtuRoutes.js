// routes/vtuRoutes.js

import express from 'express';
import {
  purchaseData,
  purchaseAirtime,
  purchaseCable,
  purchaseElectricity
} from '../controllers/vtuController.js';

const router = express.Router();

// ----------------- DATA -----------------
router.post('/data', purchaseData);

// ----------------- AIRTIME -----------------
router.post('/airtime', purchaseAirtime);

// ----------------- CABLE -----------------
router.post('/cable', purchaseCable);

// ----------------- ELECTRICITY -----------------
router.post('/electricity', purchaseElectricity);

export default router;
