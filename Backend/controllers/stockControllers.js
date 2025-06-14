import finnhub from "finnhub";
import userModel from "../models/userModel.js";
import connectfinnhub from "../utils/stockApi.js";
import axios from "axios";
import calculateTotalBalance from "../utils/leaderBoard.js";
import cron from "node-cron";
import levelProgress from "../utils/LevelChecker.js";
import generateSuggestion from "../utils/aiSuggestions.js";
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.FINHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

//  Suggestion Controller
const getSuggestion = async (req, res) => {
  try {
    const { userId, symbol } = req.body;

    const result = await generateSuggestion(userId, symbol);

    if (!result.success) {
      return res.json({ success: false, message: result.message });
    }

    const { suggestion, userSummary } = result;

    res.json({
      success: true,
      suggestion,
      userSummary,
    });
  } catch (error) {
    console.error("AI Suggestion Error:", error.message);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// LIST ALL STOCKS
const getStocks = async (req, res) => {
  try {
    const response = await axios.get(
      "https://financialmodelingprep.com/api/v3/stock/list",
      { params: { apikey: process.env.FMP_API_KEY } }
    );

    const filterStock = response.data.filter(
      (stock) => stock.exchange === "NASDAQ"
    );
    res.json({ success: true, stocks: filterStock });
  } catch (error) {
    console.error("FMP stocks error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stocks",
      error: error.message,
    });
  }
};
// KOREDE THIS IS FOR SEARCHING STOCKS
const searchStock = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.json({ success: false, message: "Stock Symbol required" });
  }
  try {
    finnhubClient.quote(query, (error, data, response) => {
      if (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" });
      }
      return res.json({ success: true, data: data });
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

//  THIS IS TO BUY STOCKS
const buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    const stockData = await connectfinnhub(symbol);
    const currentPrice = stockData.c;
    const totalCost = currentPrice * quantity;

    if (user.balance < totalCost) {
      return res.json({ success: false, message: "Insufficient balance" });
    }

    user.balance -= totalCost;
    user.portfolio.push({
      symbol,
      quantity,
      buyPrice: currentPrice,
      type: "buy",
      price: currentPrice,
    });

    user.totalBalance = await calculateTotalBalance(user);
    user.countTrades += 1;
    user.profit = user.totalBalance - user.initialDeposit;
    await levelProgress(user);

    res.json({ success: true, message: "Stock purchased", user });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to buy stock",
      error: error.message,
    });
  }
};

// TO SELL STOCKS
const sellstocks = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    const stockData = await connectfinnhub(symbol);
    const currentPrice = stockData.c;

    const stockedOwned = user.portfolio.filter(
      (stock) => stock.symbol === symbol && stock.type === "buy"
    );
    const totalOwnedQty = stockedOwned.reduce(
      (sum, stock) => sum + stock.quantity,
      0
    );

    if (totalOwnedQty < quantity) {
      return res.json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    let qtyToSell = quantity;
    for (let stock of stockedOwned) {
      if (qtyToSell === 0) break;

      const deductQty = Math.min(stock.quantity, qtyToSell);
      stock.quantity -= deductQty;
      qtyToSell -= deductQty;
    }

    user.portfolio = user.portfolio.filter(
      (stock) =>
        !(
          stock.symbol === symbol &&
          stock.type === "buy" &&
          stock.quantity === 0
        )
    );

    user.portfolio.push({
      symbol,
      quantity,
      buyPrice: stockedOwned[0].buyPrice,
      type: "sell",
      price: currentPrice,
    });

    user.balance += quantity * currentPrice;
    user.totalBalance = await calculateTotalBalance(user);
    user.countTrades += 1;
    user.profit = user.totalBalance - user.initialDeposit;
    await levelProgress(user);

    res.json({ success: true, message: "Stock sold successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to sell stock try again" });
  }
};

const aggregatePortfolio = (portfolio) => {
  const grouped = {};

  portfolio.forEach(({ symbol, quantity, buyPrice, type, price }) => {
    const key = `${symbol}_${type}`;

    if (!grouped[key]) {
      grouped[key] = {
        symbol,
        quantity: 0,
        buyPrice,
        type,
        price,
      };
    }

    grouped[key].quantity += quantity;
    grouped[key].price = price;
  });

  return Object.values(grouped);
};

// TO GET USER PORTFOLIO
const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    const aggregatedPortfolio = aggregatePortfolio(user.portfolio);

    const { totalBalance, initialDeposit } = user;

    let percentage = 0;
    if (initialDeposit > 0) {
      percentage = ((totalBalance - initialDeposit) / initialDeposit) * 100;
    }

    res.json({
      success: true,
      Portfolio: aggregatedPortfolio,
      balance: user.balance,
      TotalBalance: user.totalBalance,
      percentage: percentage.toFixed(2),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch try again" });
  }
};

cron.schedule("*/10 * * * *", async () => {
  console.log();
  try {
    const users = await userModel.find({});

    for (const user of users) {
      const totalBalance = await calculateTotalBalance(user);
      user.totalBalance = totalBalance;

      if (user.initialDeposit > 0) {
        user.percentageChange =
          ((totalBalance - user.initialDeposit) / user.initialDeposit) * 100;
      } else {
        user.percentageChange = 0;
      }

      await user.save();
    }
  } catch (error) {
    console.log(error.message, "Error in fetching ");
  }
});

export { searchStock, buyStock, sellstocks, getPortfolio, getStocks,getSuggestion };
