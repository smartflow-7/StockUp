import express from "express";
import { getSuggestion } from "../controllers/stockControllers.js";

const suggestionRoutes = express.Router();


suggestionRoutes.get("/suggestion/:userId", getSuggestion);

export default suggestionRoutes;
