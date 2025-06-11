import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
    totalBalance: { type: Number, default: 10000 },
    initialDeposit: {
      type: Number,
      required: true,
      default: 10000,
    },
    profit:{type: Number, default:0},
    level: { type: Number, default: 1 },
    countTrades:{type: Number, default: 0}, 
    badge:{type: String, default:"Beginner Trader"},
    portfolio: [
      {
        symbol: { type: String, required: true },
        quantity: { type: Number, required: true },
        type: { type: String, enum: ["buy", "sell"], required: true },
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
