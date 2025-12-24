import axios from "axios";
import { users, transactions } from "../utils/store.js";

export const fundWallet = async (req, res) => {
  const { user_id, amount } = req.body;

  let user = users.find(u => u.id === user_id);
  if (!user) {
    user = { id: user_id, name: "User", wallet_balance: 0 };
    users.push(user);
  }

  try {
    // 🔁 SIMULATED PLATNOVA VERIFY
    // (Replace with real verification later)
    const paymentVerified = true;

    if (!paymentVerified) {
      return res.status(400).json({
        status: false,
        message: "Payment not verified"
      });
    }

    // Credit wallet
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: "WALLET_FUNDING",
      amount,
      status: "SUCCESS",
      date: new Date()
    });

    res.json({
      status: true,
      message: "Wallet funded successfully",
      wallet_balance: user.wallet_balance
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Wallet funding failed"
    });
  }
};
