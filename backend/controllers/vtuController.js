// ==========================
// Plex Connect Backend - vtuController.js
// ==========================
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

// @desc    Buy service (Data, Airtime, Cable TV, Electricity)
// @route   POST /api/vtu/buy
// @access  Private
export const buyService = async (req, res) => {
  const { service, amount } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.walletBalance < amount)
      return res.status(400).json({ message: "❌ Insufficient wallet balance" });

    user.walletBalance -= amount;
    await user.save();

    const transaction = await Transaction.create({
      user: user._id,
      service,
      amount,
      status: "success",
      reference: `TX${Date.now()}`,
    });

    res.status(200).json({ walletBalance: user.walletBalance, transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
