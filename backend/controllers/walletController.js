import { updateWallet, findUserById } from "../models/userModel.js";

export const fundWallet = (req, res) => {
  const { user_id, amount } = req.body;
  if (!user_id || !amount) return res.status(400).json({ message: "User ID and amount required" });

  const newBalance = updateWallet(user_id, amount);
  if (newBalance === undefined) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ status: true, wallet_balance: newBalance });
};
