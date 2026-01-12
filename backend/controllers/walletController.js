import fetch from "node-fetch";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

export const verifyPaystackPayment = async (req, res) => {
  const { reference, userId, amount } = req.body;

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.walletBalance += amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      type: "wallet_funding",
      amount,
      reference,
    });

    res.json({
      status: true,
      message: "Wallet funded successfully",
      walletBalance: user.walletBalance,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
