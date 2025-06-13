import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js'; // Your MongoDB connection function
import userRoute from './routes/userRoutes.js'; // User auth routes (if any)
import stockRouter from './routes/stockRoutes.js'; // Stock search routes
import newsRouter from './routes/newsRoutes.js';
import boardRoutes from './routes/leaderboardRoutes.js';
import suggestionRoutes from './routes/aiSuggestionRoutes.js'; // AI suggestion routes

// App initialization
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors());        

// API endpoints
app.use("/stockUp/user", userRoute);   
app.use("/stockUp/stocks", stockRouter); 
app.use("/stockUp/news", newsRouter)
app.use("/stockUp/leaderboard",boardRoutes)
app.use("/stockUp/", suggestionRoutes)

app.get('/', (req, res) => {
    res.send('StockUp is live');
});

// Start server
app.listen(port, () => console.log('Server is running on port: ' + port));
