// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import "dotenv/config";
// import connectDB from './config/mongodb.js';
// import userRoute from './routes/userRoutes.js';
// // import stockRouter from './routes/stockRoutes.js'



// //  App config
// const app = express()
// const port = process.env.PORT || 3000;
// connectDB() 

// //middlewares
// app.use(express.json())
// app.use(cors())

// app.use(express.json());


// // api endpoionts
// app.use("/stockUp/user", userRoute)
// // app.use("/stockUp/stocks", stockRouter)
// app.use("/stockUp/stocks", stockRouter)

// app.get('/', (req,res) => {
//     res.send('stock up is live')
// })



// app.listen(port, ()=> console.log('server is running on port :' +  port))


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js'; // Your MongoDB connection function
import userRoute from './routes/userRoutes.js'; // User auth routes (if any)
import stockRouter from './routes/stockRoutes.js'; // Stock search routes

// App initialization
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors());         // To enable cross-origin requests

// API endpoints
app.use("/stockUp/user", userRoute);   // User-related routes
app.use("/stockUp/stocks", stockRouter); // Stock-related routes

// Root endpoint
app.get('/', (req, res) => {
    res.send('StockUp is live');
});

// Start server
app.listen(port, () => console.log('Server is running on port: ' + port));
