import userModel from "../models/userModel.js";


const levelProgress = async (user) => {
  const profit = user.totalBalance - user.initialDeposit;
  const trades = user.countTrades;

  let newLevel = user.level;
  let badge = user.badge;

  if (trades >= 25 && profit >= 50000) {
    newLevel = 5;
    badge = "Expert Trader";
  } else if (trades >= 15 && profit >= 1000) {
    newLevel = 4;
    badge = "Advanced Trader";
  } else if (trades >= 10 && profit >= 500) {
    newLevel = 3;
    badge = "Intermediate Trader";
  } else if (trades >= 5 && profit >= 250) {
    newLevel = 2;
    badge = "Beginner Trader";
  }

  user.level = newLevel;
  user.badge = badge;

  await user.save();
};

export default levelProgress;
