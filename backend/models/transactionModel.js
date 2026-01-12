import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "success" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", transactionSchema);
