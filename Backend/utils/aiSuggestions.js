
import userModel from "../models/userModel.js";
import connectfinnhub from "../utils/stockApi.js";

const archetypes = [
  "Crypto Cowboy",
  "Cautious Analyst",
  "High-Roller",
  "Sector Sniper",
  "Risk Explorer",
];

const generateArchetype = (user) => {
  const { countTrades, profit, portfolio } = user;
  const totalBuys = portfolio.filter((p) => p.type === "buy").length;
  const techFocus = portfolio.filter((p) => p.symbol.includes("TECH")).length;

  if (profit > 2000 && countTrades > 10) return "High-Roller";
  if (techFocus > 3) return "Sector Sniper";
  if (profit < 0) return "Cautious Analyst";
  return archetypes[Math.floor(Math.random() * archetypes.length)];
};

const generateSuggestion = async (userId, overrideSymbol = null) => {
  const user = await userModel.findById(userId);
  if (!user) return { success: false, message: "User not found" };

  const archetype = generateArchetype(user);
  const recentStock = overrideSymbol || user.portfolio[user.portfolio.length - 1]?.symbol || "AAPL";
  const marketData = await connectfinnhub(recentStock);

  let suggestion;

  switch (archetype) {
    case "High-Roller":
      suggestion = `You're on fire! Take a look at ${recentStock}, it's showing upward momentum.`;
      break;
    case "Cautious Analyst":
      suggestion = `You've been playing safe. ${recentStock} might be a solid conservative choice right now.`;
      break;
    case "Crypto Cowboy":
      suggestion = `Crypto is wild but rewarding! Fancy a dive into simulated coin stocks today?`;
      break;
    case "Sector Sniper":
      suggestion = `Tech focused, huh? Consider exploring other sectors like finance or energy for balance.`;
      break;
    default:
      suggestion = `Diversify to strengthen your portfolio. ${recentStock} looks stable for now.`;
  }

  return {
    success: true,
    archetype,
    suggestion,
    marketData,
    userSummary: {
      trades: user.countTrades,
      balance: user.balance,
      badge: user.badge
    }
  };
};

export default generateSuggestion;
