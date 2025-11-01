import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import corsMiddleware from './middlewares/cors';
import healthRoutes from './routes/health.routes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/transactions', transactionRoutes);

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
