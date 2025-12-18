// routes/adminRoutes.js

import express from 'express';
import { admin } from '../utils/adminStore.js';

const router = express.Router();

// 🔒 GET ADMIN EARNINGS
router.get('/earnings', (req, res) => {
  try {
    res.json({
      status: true,
      wallet_balance: admin.wallet_balance,
      profit_history: admin.profit_history
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch admin earnings'
    });
  }
});

export default router;
