// controllers/vtuController.js
import axios from 'axios';

const API_BASE = 'https://www.cheapdatahub.ng/api/v1/resellers';
const TOKEN = process.env.CHEAPDATAHUB_API_TOKEN;

// Helper for headers
const headers = {
  'Authorization': `Token ${TOKEN}`,
  'Content-Type': 'application/json'
};

// ----------------- Data Purchase -----------------
export const purchaseData = async (req, res) => {
  const { bundle_id, phone_number } = req.body;

  try {
    const response = await axios.post(`${API_BASE}/data/purchase/`, {
      bundle_id,
      phone_number
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Data purchase failed', error: error.response?.data });
  }
};

// ----------------- Airtime Purchase -----------------
export const purchaseAirtime = async (req, res) => {
  const { provider_id, phone_number, amount } = req.body;

  try {
    const response = await axios.post(`${API_BASE}/airtime/purchase/`, {
      provider_id,
      phone_number,
      amount
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Airtime purchase failed', error: error.response?.data });
  }
};

// ----------------- Cable Subscription -----------------
export const purchaseCable = async (req, res) => {
  const { plan_id, cardnumber, phone } = req.body;

  try {
    const response = await axios.post(`${API_BASE}/cable/purchase/`, {
      plan_id,
      cardnumber,
      phone
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Cable subscription failed', error: error.response?.data });
  }
};

// ----------------- Electricity Purchase -----------------
export const purchaseElectricity = async (req, res) => {
  const { disco_id, meter_number, amount, phone, meter_type } = req.body;

  try {
    const response = await axios.post(`${API_BASE}/electricity/purchase/`, {
      disco_id,
      meter_number,
      amount,
      phone,
      meter_type
    }, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ status: false, message: 'Electricity purchase failed', error: error.response?.data });
  }
};
