import "dotenv/config";
import express from 'express';
import taskRoutes from './modules/task/routes/task.routes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());


app.use('/api', taskRoutes);
app.use('/api', authRoutes);





app.use(errorMiddleware);
const port = 5000
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

