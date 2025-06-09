import finnhub from "finnhub";
import userModel from "../models/userModel.js";
import connectfinnhub from "../utils/stockApi.js";
import axios from "axios";
import calculateTotalBalance from "../utils/leaderBoard.js";
import cron from "node-cron";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.FINHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();
// LIST ALL STOCKS
const getStocks = async (req, res) => {
  try {
    const response = await axios.get("https://finnhub.io/api/v1/stock/symbol", {
      params: {
        exchange: "US",
        token: process.env.FINHUB_API_KEY,
      },
    });

    const filterStock = response.data.filter(
      (stock) => stock.currency === "USD"
    );

    res.json({ success: true, stocks: filterStock });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Network connection",
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
    await user.save();
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

    const stockedOwned = user.portfolio.find(
      (stock) => stock.symbol === symbol && stock.type === "buy"
    );

    if (!stockedOwned || stockedOwned.quantity < quantity) {
      return res.json({ success: false, message: "Insfficient Balance" });
    }

    stockedOwned.quantity -= quantity;
    if (stockedOwned.quantity === 0) {
      user.portfolio = user.portfolio.filter((s) => s !== stockedOwned);
    }

    user.balance += quantity * currentPrice;
    user.portfolio.push({
      symbol,
      quantity,
      buyPrice: stockedOwned.buyPrice,
      type: "sell",
      price: currentPrice,
    });

    user.totalBalance = await calculateTotalBalance(user);
    await user.save();
    res.json({ success: true, message: "Stock sold successfully", user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unable to sell stock try again" });
  }
};

// TO GET USER PORTFOLIO
const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    const { totalBalance, initialDeposit } = user;

    let percentage = 0;
    if (initialDeposit > 0) {
      percentage = ((totalBalance - initialDeposit) / initialDeposit) * 100;
    }
    res.json({
      success: true,
      Portfolio: user.portfolio,
      balance: user.balance,
      TotalBalance: user.totalBalance,
      percentage: percentage.toFixed(2)
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
        user.percentageChange = ((totalBalance - user.initialDeposit) / user.initialDeposit) * 100;
      } else {
        user.percentageChange = 0;
      }

      await user.save();
    }
    console.log("User balances updated.");

  } catch (error) {
    console.log(error.message,"Error in fetching ");
    
  }
})

export {
  searchStock,
  buyStock,
  sellstocks,
  getPortfolio,
  getStocks,
};
