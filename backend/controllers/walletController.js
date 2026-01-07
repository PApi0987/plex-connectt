import { users, transactions } from "../data/data.js"; // your mock data

export const fundWallet = (req, res) => {
  const { user_id, amount } = req.body;

  // Find user
  const user = users.find(u => u.id === user_id);
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  // Update wallet
  user.wallet_balance += amount;

  // Record transaction
  transactions.unshift({
    id: transactions.length + 1,
    user_id,
    service: "WALLET FUNDING",
    amount,
    date: new Date().toLocaleString(),
    status: "SUCCESS"
  });

  res.status(200).json({
    status: true,
    message: `Wallet funded successfully with ₦${amount}`,
    wallet_balance: user.wallet_balance
  });
};
