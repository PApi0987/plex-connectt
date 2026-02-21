import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

import {
  initializePayment,
  verifyPayment,
} from "../utils/paystack.js";


// =============================
// INIT FUNDING
// =============================
export const fundWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    const payment = await initializePayment(
      req.user.email,
      amount
    );

    res.json({
      authorization_url: payment.authorization_url,
      reference: payment.reference,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =============================
// VERIFY PAYMENT
// =============================
export const verifyWalletFunding = async (req, res) => {
  try {
    const { reference } = req.params;

    const payment = await verifyPayment(reference);

    if (payment.status !== "success")
      return res.status(400).json({ message: "Payment failed" });

    const user = await User.findOne({
      email: payment.customer.email,
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const amount = payment.amount / 100;

    // Credit wallet
    user.wallet += amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      service: "wallet_funding",
      amount,
      status: "success",
      meta: payment,
    });

    res.json({
      message: "Wallet funded successfully",
      wallet: user.wallet,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
