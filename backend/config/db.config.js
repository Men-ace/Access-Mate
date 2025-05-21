import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Load environment variables
dotenv.config()
export const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log("Error", error.message)
    }
}