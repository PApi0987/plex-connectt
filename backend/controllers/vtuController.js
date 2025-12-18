import axios from 'axios';

const API_BASE = 'https://www.cheapdatahub.ng/api/v1/resellers';
const TOKEN = process.env.CHEAPDATAHUB_API_TOKEN;

const headers = {
  Authorization: `Token ${TOKEN}`,
  'Content-Type': 'application/json'
};

// DATA
export const purchaseData = async (req, res) => {
  try {
    const { bundle_id, phone_number } = req.body;

    const response = await axios.post(
      `${API_BASE}/data/purchase/`,
      { bundle_id, phone_number },
      { headers }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Data purchase failed',
      error: err.response?.data || err.message
    });
  }
};

// AIRTIME
export const purchaseAirtime = async (req, res) => {
  try {
    const { provider_id, phone_number, amount } = req.body;

    const response = await axios.post(
      `${API_BASE}/airtime/purchase/`,
      { provider_id, phone_number, amount },
      { headers }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Airtime purchase failed',
      error: err.response?.data || err.message
    });
  }
};

// CABLE
export const purchaseCable = async (req, res) => {
  try {
    const { plan_id, cardnumber, phone } = req.body;

    const response = await axios.post(
      `${API_BASE}/cable/purchase/`,
      { plan_id, cardnumber, phone },
      { headers }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Cable subscription failed',
      error: err.response?.data || err.message
    });
  }
};

// ELECTRICITY
export const purchaseElectricity = async (req, res) => {
  try {
    const { disco_id, meter_number, amount, phone, meter_type } = req.body;

    const response = await axios.post(
      `${API_BASE}/electricity/purchase/`,
      { disco_id, meter_number, amount, phone, meter_type },
      { headers }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Electricity purchase failed',
      error: err.response?.data || err.message
    });
  }
};
