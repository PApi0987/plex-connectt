// ==========================
// Plex Connect Backend - walletController.js
// ==========================
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

// @desc    Fund wallet
// @route   POST /api/wallet/fund
// @access  Private
export const fundWallet = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.walletBalance += Number(amount);
    await user.save();

    // Record transaction
    const transaction = await Transaction.create({
      user: user._id,
      service: "Wallet Top-up",
      amount,
      status: "success",
      reference: `WTX${Date.now()}`,
    });

    res.status(200).json({ walletBalance: user.walletBalance, transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
