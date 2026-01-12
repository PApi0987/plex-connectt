import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String }, // funding, airtime, data, etc
    amount: { type: Number },
    reference: { type: String },
    status: { type: String, default: "success" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
