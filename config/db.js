import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log("MongoDB Connected");   
    } catch (error) {
        console.error(error.message);
        console.log(mongoURI);
        console.log("Connection Failed");
    }
}

export { connectDB };