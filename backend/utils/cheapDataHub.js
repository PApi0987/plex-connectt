import axios from "axios";

const BASE_URL = "https://cheapdatahub.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token ${process.env.CHEAPDATAHUB_API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// =====================
// 📡 BUY DATA
// =====================
export const sendData = async (payload) => {
  const res = await api.post("/data/", payload);
  return res.data;
};

// =====================
// 📞 BUY AIRTIME
// =====================
export const sendAirtime = async (payload) => {
  const res = await api.post("/airtime/", payload);
  return res.data;
};

// =====================
// ⚡ ELECTRICITY
// =====================
export const payElectricity = async (payload) => {
  const res = await api.post("/electricity/", payload);
  return res.data;
};

// =====================
// 📺 CABLE TV
// =====================
export const subscribeCableTV = async (payload) => {
  const res = await api.post("/cable/", payload);
  return res.data;
};
