import express from 'express';
import { PORT } from './config/env';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import competitorRoutes from './routes/competitorRoutes';
import adRoutes from './routes/adRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import userRoutes from './routes/userRoutes';
import platformRoutes from './routes/platformRoutes';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/platforms', platformRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Longwei Herbs E-commerce Platform API running', version: 'v2.0.0' });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});
