// routes/walletRoutes.js
import express from 'express';
import fetch from 'node-fetch'; // npm install node-fetch
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const router = express.Router();

// -----------------------
// MOCK DATABASE
// -----------------------
let users = [
  { id: 1, name: "John Doe", wallet_balance: 5000, transactions: [] },
  // Add more users as needed
];

// -----------------------
// FUND WALLET VIA PAYSTACK
// -----------------------
router.post('/paystack', async (req, res) => {
  const { reference, user_id, amount } = req.body;

  try {
    // 1️⃣ Verify payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // 2️⃣ Update user's wallet
      const user = users.find(u => u.id === user_id);
      if (!user) return res.status(404).json({ status: false, message: "User not found" });

      user.wallet_balance += amount;

      // 3️⃣ Save transaction
      const transaction = {
        id: uuidv4(),
        type: "WALLET FUNDING",
        amount,
        reference,
        date: new Date().toLocaleString()
      };
      user.transactions.unshift(transaction);

      return res.json({
        status: true,
        message: 'Wallet credited successfully!',
        wallet_balance: user.wallet_balance,
        transactions: user.transactions
      });
    } else {
      return res.json({ status: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Server error' });
  }
});

// -----------------------
// GET USER WALLET & TRANSACTIONS
// -----------------------
router.get('/:user_id', (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const user = users.find(u => u.id === user_id);
  if (!user) return res.status(404).json({ status: false, message: "User not found" });

  res.json({
    status: true,
    wallet_balance: user.wallet_balance,
    transactions: user.transactions
  });
});

export default router;
