import getNews from "../controllers/newsControllers.js";

import express from "express"

const newsRouter = express.Router()

newsRouter.get("/news",getNews)


export default newsRouter;