import fetch from "node-fetch";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

export const verifyPaystackPayment = async (req, res) => {
  const { reference, user_id, amount } = req.body;

  // Basic validation
  if (!reference || !user_id || !amount) {
    return res.status(400).json({
      status: false,
      message: "Missing required fields",
    });
  }

  try {
    // 1️⃣ Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    if (!result.status || result.data.status !== "success") {
      return res.status(400).json({
        status: false,
        message: "Payment verification failed",
      });
    }

    // 2️⃣ Confirm amount matches (security)
    const paidAmount = result.data.amount / 100; // Paystack uses kobo
    if (paidAmount !== Number(amount)) {
      return res.status(400).json({
        status: false,
        message: "Amount mismatch detected",
      });
    }

    // 3️⃣ Get user
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // 4️⃣ Credit wallet
    user.walletBalance += paidAmount;
    await user.save();

    // 5️⃣ Save transaction
    await Transaction.create({
      user: user._id,
      type: "wallet_funding",
      amount: paidAmount,
      reference,
      status: "success",
    });

    // 6️⃣ Respond
    return res.json({
      status: true,
      message: "Wallet credited successfully",
      wallet_balance: user.walletBalance,
      transaction: {
        type: "Wallet Funding",
        amount: paidAmount,
        reference,
        date: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Paystack error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
