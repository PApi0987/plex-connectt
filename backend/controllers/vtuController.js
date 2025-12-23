import axios from 'axios';
import { users, transactions } from '../utils/store.js';
import { admin } from '../utils/adminStore.js';

const API_BASE = 'https://www.cheapdatahub.ng/api/v1/resellers';
const TOKEN = process.env.CHEAPDATAHUB_API_TOKEN;

const headers = {
  Authorization: `Token ${TOKEN}`,
  'Content-Type': 'application/json'
};

const getUserAndCheckBalance = (user_id, amount) => {
  const user = users.find(u => u.id === user_id);
  if (!user) return { error: 'User not found' };
  if (user.wallet_balance < amount) return { error: 'Insufficient wallet balance' };
  return { user };
};

const recordTransaction = (user_id, service, amount, status, provider_ref = null, api_cost = 0) => {
  const profit = amount - api_cost;
  if (status === 'SUCCESS') {
    admin.wallet_balance += profit;
    admin.profit_history.push({ service, profit, date: new Date() });
  }
  transactions.push({ id: transactions.length + 1, user_id, service, amount, status, provider_ref, date: new Date() });
};

export const purchaseData = async (req, res) => {
  const { user_id, bundle_id, phone_number, amount } = req.body;
  const check = getUserAndCheckBalance(user_id, amount);
  if (check.error) return res.status(400).json({ status: false, message: check.error });

  const user = check.user;
  user.wallet_balance -= amount;

  try {
    const response = await axios.post(`${API_BASE}/data/purchase/`, { bundle_id, phone_number }, { headers });
    recordTransaction(user_id, 'DATA', amount, 'SUCCESS', response.data.transaction_id, 490);
    res.json({ status: true, message: 'Data purchase successful', data: response.data });
  } catch (err) {
    user.wallet_balance += amount;
    recordTransaction(user_id, 'DATA', amount, 'FAILED');
    res.status(500).json({ status: false, message: 'Data purchase failed' });
  }
};

// Similar functions for purchaseAirtime, purchaseCable, purchaseElectricity...
