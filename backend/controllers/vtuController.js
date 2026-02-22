import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

import {
  buyData,
  buyAirtime,
  buyElectricity,
  buyCableTV,
} from "../utils/cheapDataHub.js";


// ==============================
// WALLET + TRANSACTION ENGINE
// ==============================
const processTransaction = async ({
  userId,
  service,
  amount,
  apiCall,
}) => {

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  if (user.wallet < amount)
    throw new Error("Insufficient wallet balance");

  // Deduct wallet FIRST
  user.wallet -= amount;
  await user.save();

  try {
    // Call Provider API
    const apiResponse = await apiCall();

    const tx = await Transaction.create({
      user: userId,
      service,
      amount,
      status: "success",
      meta: apiResponse,
    });

    return tx;

  } catch (error) {

    // 🔥 REFUND USER IF API FAILS
    user.wallet += amount;
    await user.save();

    throw new Error("Service provider failed");
  }
};



// ==============================
// 📞 AIRTIME
// ==============================
export const buyAirtimeController = async (req, res) => {
  try {

    const { network, phone, amount } = req.body;

    const tx = await processTransaction({
      userId: req.user._id,
      service: "airtime",
      amount,
      apiCall: () =>
        buyAirtime({ network, phone, amount }),
    });

    res.json({
      success: true,
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

    const tx = await processTransaction({
      userId: req.user._id,
      service: "data",
      amount,
      apiCall: () =>
        buyData({ network, phone, plan }),
    });

    res.json({
      success: true,
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

    const tx = await processTransaction({
      userId: req.user._id,
      service: "electricity",
      amount,
      apiCall: () =>
        buyElectricity({
          disco,
          meterNumber,
          amount,
        }),
    });

    res.json({
      success: true,
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

    const {
      provider,
      smartcard,
      packageName,
      amount,
    } = req.body;

    const tx = await processTransaction({
      userId: req.user._id,
      service: "cable",
      amount,
      apiCall: () =>
        buyCableTV({
          provider,
          smartcard,
          packageName,
        }),
    });

    res.json({
      success: true,
      message: "Cable subscription successful",
      tx,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
