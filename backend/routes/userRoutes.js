import express from 'express';
import {
  registerUser,
  getUsers,
  fundWallet,
  getWalletBalance,
  getUserTransactions
} from '../controllers/userController.js';

const router = express.Router();

// Users
router.post('/register', registerUser);
router.get('/', getUsers);

// Wallet
router.post('/wallet/fund', fundWallet);
router.get('/wallet/:userId', getWalletBalance);

// Transactions
router.get('/transactions/:userId', getUserTransactions);

export default router;
