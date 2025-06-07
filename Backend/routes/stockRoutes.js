import express from "express";
import { searchStock, buyStock, sellstocks,getPortfolio,getStocks } from "../controllers/stockControllers.js";
import authUser from "../middlewares/authMiddleware.js";

const stockRouter = express.Router();

stockRouter.get("/search", searchStock);
stockRouter.post("/buy",authUser,buyStock)
stockRouter.post("/sell",authUser,sellstocks)
stockRouter.get("/portfolio",authUser,getPortfolio)
stockRouter.get("/all-stocks",authUser,getStocks)

export default stockRouter;
