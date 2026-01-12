// routes/walletRoutes.js
import express from "express";
import fetch from "node-fetch"; // make sure node-fetch is installed
// import your user model here to update wallet in DB if available
// import User from "../models/userModel.js";

const router = express.Router();

// 💳 Fund Wallet via Paystack
// POST /api/wallet/paystack
router.post("/paystack", async (req, res) => {
  const { reference, user_id, amount } = req.body;

  if (!reference || !user_id || !amount) {
    return res.status(400).json({ status: false, message: "Missing required fields" });
  }

  try {
    // 1️⃣ Verify payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    const data = await response.json();

    if (data.status && data.data.status === "success") {
      // 2️⃣ Credit user wallet
      // Replace this with real DB update
      // const user = await User.findById(user_id);
      // user.wallet += amount;
      // await user.save();

      const wallet_balance = 5000 + Number(amount); // mock example

      // 3️⃣ Return response
      return res.json({
        status: true,
        message: "Wallet credited successfully!",
        wallet_balance,
        transaction: {
          service: "Wallet Funding",
          amount,
          date: new Date().toLocaleString()
        }
      });
    } else {
      return res.json({ status: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

export default router;
