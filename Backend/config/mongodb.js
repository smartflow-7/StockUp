import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config()

const connectDB = async () => {

    mongoose.connection.on('connected',()=>{
        console.log('MongoDB connected');
        
    })

    await  mongoose.connect(`${process.env.MONGDB_URL}`)
}


export default  connectDB