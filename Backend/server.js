import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoutes.js';




//  App config
const app = express()
const port = process.env.PORT || 3000;
connectDB() 

//middlewares
app.use(express.json())
app.use(cors())


// api endpoionts
app.use("/stockUp/user", userRoute)

app.get('/', (req,res) => {
    res.send('stock up is live')
})



app.listen(port, ()=> console.log('server is running on port :' +  port))