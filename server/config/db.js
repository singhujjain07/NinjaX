import mongoose, { mongo } from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database `)
    } catch (error) {
        console.log('Error in connecting to database')
    }
}

export default connectDB;