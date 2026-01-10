// routes/walletRoutes.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 🔹 Temporary wallet balance (replace with DB later)
let walletBalance = 0;

/**
 * INIT PAYSTACK PAYMENT
 * POST /api/wallet/paystack/init
 */
router.post("/paystack/init", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({
      status: false,
      message: "Email and amount are required",
    });
  }

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // kobo
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return res.status(400).json({
        status: false,
        message: "Unable to initialize payment",
      });
    }

    res.json({
      status: true,
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack init error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

/**
 * VERIFY PAYSTACK PAYMENT
 * POST /api/wallet/paystack/verify
 */
router.post("/paystack/verify", async (req, res) => {
  const { reference, amount } = req.body;

  if (!reference || !amount) {
    return res.status(400).json({
      status: false,
      message: "Reference and amount required",
    });
  }

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

    if (data.status && data.data.status === "success") {
      walletBalance += amount;

      return res.json({
        status: true,
        message: "Wallet funded successfully",
        wallet_balance: walletBalance,
      });
    }

    res.status(400).json({
      status: false,
      message: "Payment verification failed",
    });
  } catch (error) {
    console.error("Paystack verify error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});

export default router;
