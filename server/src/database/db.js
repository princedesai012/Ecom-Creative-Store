import mongoose from "mongoose";

// Async function to connect to MongoDB using Mongoose

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");

    }
    catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 

    }
}