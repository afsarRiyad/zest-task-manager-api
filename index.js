import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './modules/task/routes/taskRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';

dotenv.config()
const app = express();
app.use(express.json());


app.use('/api', taskRoutes);


app.use(errorMiddleware);

const port = 5000

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

startServer();
