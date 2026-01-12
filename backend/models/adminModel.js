import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  wallet_balance: { type: Number, default: 0 }
});

export default mongoose.model("Admin", adminSchema);
