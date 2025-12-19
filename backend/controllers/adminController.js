import { users, transactions } from '../utils/store.js';
import { admin } from '../utils/adminStore.js';

// 📊 Admin dashboard stats
export const getAdminStats = (req, res) => {
  const totalUsers = users.length;
  const totalTransactions = transactions.length;

  const totalVolume = transactions.reduce(
    (sum, tx) => sum + tx.amount,
    0
  );

  const totalProfit = admin.wallet_balance;

  res.json({
    status: true,
    data: {
      totalUsers,
      totalTransactions,
      totalVolume,
      totalProfit,
      adminWallet: admin.wallet_balance
    }
  });
};

// 📜 All transactions
export const getAllTransactions = (req, res) => {
  res.json({
    status: true,
    count: transactions.length,
    data: transactions
  });
};

// 👥 All users
export const getAllUsers = (req, res) => {
  res.json({
    status: true,
    count: users.length,
    data: users
  });
};
