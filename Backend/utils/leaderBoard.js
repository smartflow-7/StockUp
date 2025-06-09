
import connectfinnhub from "./stockApi.js";

const calculateTotalBalance = async (user) => {
  let worth = {};

  for (const stock of user.portfolio) {
    const { symbol, type, quantity } = stock;
    if (!worth[symbol]) worth[symbol] = 0;

    if (type === "buy") {
      worth[symbol] += quantity;
    } else if (type === "sell") {
      worth[symbol] -= quantity;
    }
  }

  let portfolioValue = 0;

  for (const symbol in worth) {
    const quantity = worth[symbol];
    if (quantity > 0) {
      try {
        const stockData = await connectfinnhub(symbol);
        const currentPrice = stockData.c;
        portfolioValue += quantity * currentPrice;
      } catch (error) {
        console.error(`Failed to fetch price for ${symbol}:`, error.message);
      }
    }
  }

  return user.balance + portfolioValue;
};

export default calculateTotalBalance;
