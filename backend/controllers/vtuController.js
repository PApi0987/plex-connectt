import axios from "axios";
import { users, transactions } from "../utils/store.js";

// ===============================
// 🔎 FIND USER OR CREATE USER
// ===============================
const getUser = (user_id) => {
  let user = users.find(u => u.id === user_id);

  // If user does not exist, create one
  if (!user) {
    user = {
      id: user_id,
      name: "New User",
      wallet_balance: 5000
    };
    users.push(user);
  }

  return user;
};

// ===============================
// 📡 BUY DATA
// ===============================
export const purchaseData = async (req, res) => {
  const { user_id, bundle_id, phone_number, amount } = req.body;

  // Get user (or auto-create)
  const user = getUser(user_id);

  // Check wallet
  if (user.wallet_balance < amount) {
    return res.status(400).json({
      status: false,
      message: "Insufficient wallet balance"
    });
  }

  // Deduct wallet
  user.wallet_balance -= amount;

  try {
    // 🔁 CALL CHEAPDATAHUB (REAL API)
    const response = await axios.post(
      "https://www.cheapdatahub.ng/api/v1/resellers/data/purchase/",
      { bundle_id, phone_number },
      {
        headers: {
          Authorization: `Token ${process.env.CHEAPDATAHUB_API_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Save transaction
    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: "DATA",
      amount,
      status: "SUCCESS",
      date: new Date()
    });

    return res.json({
      status: true,
      message: "Data purchase successful",
      data: response.data
    });

  } catch (error) {
    // Refund if failed
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: "DATA",
      amount,
      status: "FAILED",
      date: new Date()
    });

    return res.status(500).json({
      status: false,
      message: "Data purchase failed"
    });
  }
};
