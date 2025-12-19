import express from 'express';
import { adminAuth } from '../middlewares/adminAuth.js';
import {
  getAdminStats,
  getAllUsers,
  getAllTransactions
} from '../controllers/adminController.js';

const router = express.Router();

// Protect all admin routes
router.use(adminAuth);

// Admin dashboard stats
router.get('/stats', getAdminStats);

// View all users
router.get('/users', getAllUsers);

// View all transactions
router.get('/transactions', getAllTransactions);

export default router;
