import express from "express";
import { getLeaderboard } from "../controllers/leaderboardControllers.js"; 

const boardRoutes = express.Router();

boardRoutes.get("/", getLeaderboard);

export default boardRoutes;
