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

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/competitors', competitorRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/platforms', platformRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '陇渭本草电商运营平台 API 服务正常运行' });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});