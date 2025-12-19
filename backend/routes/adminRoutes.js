import express from 'express';
import {
  getAdminStats,
  getAllTransactions,
  getAllUsers
} from '../controllers/adminController.js';

import { adminAuth } from '../middlewares/adminAuth.js';

const router = express.Router();

// 🔐 Protected admin routes
router.get('/stats', adminAuth, getAdminStats);
router.get('/transactions', adminAuth, getAllTransactions);
router.get('/users', adminAuth, getAllUsers);

export default router;
