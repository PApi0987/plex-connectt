// controllers/vtuController.js

import axios from 'axios';
import { users, transactions } from '../utils/store.js';

const API_BASE = 'https://www.cheapdatahub.ng/api/v1/resellers';
const TOKEN = process.env.CHEAPDATAHUB_API_TOKEN;

// Headers for CheapDataHub
const headers = {
  Authorization: `Token ${TOKEN}`,
  'Content-Type': 'application/json'
};

// 🔒 Helper: validate user & wallet balance
const getUserAndCheckBalance = (user_id, amount) => {
  const user = users.find(u => u.id === user_id);

  if (!user) {
    return { error: 'User not found' };
  }

  if (user.wallet_balance < amount) {
    return { error: 'Insufficient wallet balance' };
  }

  return { user };
};

// =======================
// 📡 DATA PURCHASE
// =======================
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
      service: 'DATA',
      amount,
      status: 'SUCCESS',
      provider_ref: response.data.transaction_id,
      date: new Date()
    });

    res.json({
      status: true,
      message: 'Data purchase successful',
      data: response.data
    });

  } catch (error) {
    // REFUND
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'DATA',
      amount,
      status: 'FAILED',
      date: new Date()
    });

    res.status(500).json({
      status: false,
      message: 'Data purchase failed'
    });
  }
};

// =======================
// 📞 AIRTIME PURCHASE
// =======================
export const purchaseAirtime = async (req, res) => {
  const { user_id, provider_id, phone_number, amount } = req.body;

  const check = getUserAndCheckBalance(user_id, amount);
  if (check.error) {
    return res.status(400).json({ status: false, message: check.error });
  }

  const user = check.user;
  user.wallet_balance -= amount;

  try {
    const response = await axios.post(
      `${API_BASE}/airtime/purchase/`,
      { provider_id, phone_number, amount },
      { headers }
    );

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'AIRTIME',
      amount,
      status: 'SUCCESS',
      provider_ref: response.data.transaction_id,
      date: new Date()
    });

    res.json({
      status: true,
      message: 'Airtime purchase successful',
      data: response.data
    });

  } catch (error) {
    // REFUND
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'AIRTIME',
      amount,
      status: 'FAILED',
      date: new Date()
    });

    res.status(500).json({
      status: false,
      message: 'Airtime purchase failed'
    });
  }
};

// =======================
// 📺 CABLE SUBSCRIPTION
// =======================
export const purchaseCable = async (req, res) => {
  const { user_id, plan_id, cardnumber, phone, amount } = req.body;

  const check = getUserAndCheckBalance(user_id, amount);
  if (check.error) {
    return res.status(400).json({ status: false, message: check.error });
  }

  const user = check.user;
  user.wallet_balance -= amount;

  try {
    const response = await axios.post(
      `${API_BASE}/cable/purchase/`,
      { plan_id, cardnumber, phone },
      { headers }
    );

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'CABLE',
      amount,
      status: 'SUCCESS',
      provider_ref: response.data.transaction_id,
      date: new Date()
    });

    res.json({
      status: true,
      message: 'Cable subscription successful',
      data: response.data
    });

  } catch (error) {
    // REFUND
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'CABLE',
      amount,
      status: 'FAILED',
      date: new Date()
    });

    res.status(500).json({
      status: false,
      message: 'Cable subscription failed'
    });
  }
};

// =======================
// ⚡ ELECTRICITY PURCHASE
// =======================
export const purchaseElectricity = async (req, res) => {
  const { user_id, disco_id, meter_number, meter_type, phone, amount } = req.body;

  const check = getUserAndCheckBalance(user_id, amount);
  if (check.error) {
    return res.status(400).json({ status: false, message: check.error });
  }

  const user = check.user;
  user.wallet_balance -= amount;

  try {
    const response = await axios.post(
      `${API_BASE}/electricity/purchase/`,
      { disco_id, meter_number, meter_type, phone, amount },
      { headers }
    );

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'ELECTRICITY',
      amount,
      status: 'SUCCESS',
      provider_ref: response.data.token,
      date: new Date()
    });

    res.json({
      status: true,
      message: 'Electricity purchase successful',
      token: response.data.token,
      data: response.data
    });

  } catch (error) {
    // REFUND
    user.wallet_balance += amount;

    transactions.push({
      id: transactions.length + 1,
      user_id,
      service: 'ELECTRICITY',
      amount,
      status: 'FAILED',
      date: new Date()
    });

    res.status(500).json({
      status: false,
      message: 'Electricity purchase failed'
    });
  }
};
