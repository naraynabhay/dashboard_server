import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Database connection
export const mongoDB = () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MONGO_URI environment variable not set.");
        process.exit(1);
    }

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB database is connected!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });
};
