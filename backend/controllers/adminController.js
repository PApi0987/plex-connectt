// controllers/adminController.js
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import Admin from "../models/adminModel.js";

// GET /api/admin/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    const transactions = await Transaction.find();
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    const adminData = await Admin.findOne(); // assume single admin
    const totalProfit = adminData ? adminData.wallet_balance : 0;

    res.json({
      status: true,
      data: {
        totalUsers,
        totalTransactions,
        totalVolume,
        totalProfit,
        adminWallet: totalProfit
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json({
      status: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// GET /api/admin/transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json({
      status: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
