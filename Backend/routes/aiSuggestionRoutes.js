import express from "express";
import { getSuggestion } from "../controllers/stockControllers.js";

const suggestionRoutes = express.Router();


suggestionRoutes.post("/suggestion", getSuggestion);

export default suggestionRoutes;
