// controllers/userController.js
import { users, transactions } from '../utils/store.js';

// Register user
export const registerUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ status: false, message: 'Name and email required' });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ status: false, message: 'User already exists' });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    wallet_balance: 0
  };

  users.push(user);

  res.status(201).json({ status: true, user });
};

// Get users
export const getUsers = (req, res) => {
  res.json({ status: true, users });
};

// Fund wallet
export const fundWallet = (req, res) => {
  const { user_id, amount } = req.body;

  const user = users.find(u => u.id === user_id);
  if (!user || amount <= 0) {
    return res.status(400).json({ status: false, message: 'Invalid request' });
  }

  user.wallet_balance += amount;

  transactions.push({
    id: transactions.length + 1,
    user_id,
    type: 'FUND',
    amount,
    status: 'SUCCESS',
    date: new Date()
  });

  res.json({ status: true, wallet_balance: user.wallet_balance });
};

// Wallet balance
export const getWalletBalance = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.userId));
  if (!user) return res.status(404).json({ status: false, message: 'User not found' });

  res.json({ status: true, wallet_balance: user.wallet_balance });
};

// User transactions
export const getUserTransactions = (req, res) => {
  const userId = Number(req.params.userId);
  res.json({
    status: true,
    transactions: transactions.filter(t => t.user_id === userId)
  });
};
