import express from 'express';
import { purchaseData, purchaseAirtime, purchaseCable, purchaseElectricity } from '../controllers/vtuController.js';

const router = express.Router();

router.post('/data', purchaseData);
router.post('/airtime', purchaseAirtime);
router.post('/cable', purchaseCable);
router.post('/electricity', purchaseElectricity);

export default router;
