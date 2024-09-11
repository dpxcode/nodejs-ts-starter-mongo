import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CONFIG from '../../config/v1/config';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        if (!CONFIG.mongo_srv) {
            throw new Error('MongoDB connection string is not defined');
        }
        await mongoose.connect(CONFIG.mongo_srv);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;