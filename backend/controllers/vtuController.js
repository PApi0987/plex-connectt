import axios from 'axios';
import { users, transactions } from '../utils/store.js';

const API_BASE = 'https://www.cheapdatahub.ng/api/v1/resellers';
const TOKEN = process.env.CHEAPDATAHUB_API_TOKEN;

const headers = {
  Authorization: `Token ${TOKEN}`,
  'Content-Type': 'application/json'
};

// 🔒 Helper: check user & balance
const getUserAndCheckBalance = (user_id, amount) => {
  const user = users.find(u => u.id === user_id);
  if (!user) return { error: 'User not found' };
  if (user.wallet_balance < amount) return { error: 'Insufficient wallet balance' };
  return { user };
};

// 📡 DATA PURCHASE
export const purchaseData = async (req, res) => {
  const { user_id, bundle_id, phone_number, amount } = req.body;

  const check = getUserAndCheckBalance(user_id, amount);
  if (check.error) {
    return res.status(400).json({ status: false, message: check.error });
  }

  const user = check.user;
  user.wallet_balance -= amount;

  try {
    const response = await axios.post(
      `${API_BASE}/data/purchase/`,
      { bundle_id, phone_number },
      { headers }
    );

    transactions.push({
      id: transactions.length + 1,
      user_id,
      type: 'DATA',
      amount,
      status: 'SUCCESS',
      provider_ref: response.data.transaction_id,
      date: new Date()
    });

    res.json({ status: true, message: 'Data purchase successful', data: response.data });

  } catch (err) {
    // REFUND
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      type: 'DATA',
      amount,
      status: 'FAILED',
      date: new Date()
    });

    res.status(500).json({ status: false, message: 'Data purchase failed' });
  }
};
