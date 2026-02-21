import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

import {
  buyData,
  buyAirtime,
  buyElectricity,
  buyCableTV,
} from "../utils/cheapDataHub.js";


// ==============================
// HELPER — WALLET PROCESS
// ==============================
const processTransaction = async ({
  userId,
  service,
  amount,
  meta,
}) => {

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  if (user.wallet < amount)
    throw new Error("Insufficient wallet balance");

  // Deduct wallet
  user.wallet -= amount;
  await user.save();

  // Save transaction
  const tx = await Transaction.create({
    user: userId,
    service,
    amount,
    status: "success",
    meta,
  });

  return tx;
};



// ==============================
// 📞 AIRTIME
// ==============================
export const buyAirtimeController = async (req, res) => {
  try {
    const { network, phone, amount } = req.body;

    const apiResponse = await buyAirtime({
      network,
      phone,
      amount,
    });

    const tx = await processTransaction({
      userId: req.user._id,
      service: "airtime",
      amount,
      meta: apiResponse,
    });

    res.json({
      message: "Airtime purchase successful",
      tx,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ==============================
// 📡 DATA
// ==============================
export const buyDataController = async (req, res) => {
  try {
    const { network, phone, plan, amount } = req.body;

    const apiResponse = await buyData({
      network,
      phone,
      plan,
    });

    const tx = await processTransaction({
      userId: req.user._id,
      service: "data",
      amount,
      meta: apiResponse,
    });

    res.json({
      message: "Data purchase successful",
      tx,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ==============================
// ⚡ ELECTRICITY
// ==============================
export const buyElectricityController = async (req, res) => {
  try {
    const { disco, meterNumber, amount } = req.body;

    const apiResponse = await buyElectricity({
      disco,
      meterNumber,
      amount,
    });

    const tx = await processTransaction({
      userId: req.user._id,
      service: "electricity",
      amount,
      meta: apiResponse,
    });

    res.json({
      message: "Electricity token generated",
      tx,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ==============================
// 📺 CABLE TV
// ==============================
export const buyCableController = async (req, res) => {
  try {
    const { provider, smartcard, packageName, amount } = req.body;

    const apiResponse = await buyCableTV({
      provider,
      smartcard,
      packageName,
    });

    const tx = await processTransaction({
      userId: req.user._id,
      service: "cable",
      amount,
      meta: apiResponse,
    });

    res.json({
      message: "Cable subscription successful",
      tx,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
