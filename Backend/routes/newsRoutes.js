import getNews from "../controllers/newsControllers.js";

import express from "express"

const newsRouter = express.Router()

newsRouter.get("/",getNews)


export default newsRouter;