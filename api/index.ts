import express from 'express';
import { PORT } from './config/env';

const app = express();

app.use(express.json());

try {
  import('./routes/authRoutes').then(({ default: authRoutes }) => {
    app.use('/api/auth', authRoutes);
  });
  
  import('./routes/productRoutes').then(({ default: productRoutes }) => {
    app.use('/api/products', productRoutes);
  });
  
  import('./routes/competitorRoutes').then(({ default: competitorRoutes }) => {
    app.use('/api/competitors', competitorRoutes);
  });
  
  import('./routes/adRoutes').then(({ default: adRoutes }) => {
    app.use('/api/ads', adRoutes);
  });
  
  import('./routes/analyticsRoutes').then(({ default: analyticsRoutes }) => {
    app.use('/api/analytics', analyticsRoutes);
  });
  
  import('./routes/userRoutes').then(({ default: userRoutes }) => {
    app.use('/api/users', userRoutes);
  });
  
  import('./routes/platformRoutes').then(({ default: platformRoutes }) => {
    app.use('/api/platforms', platformRoutes);
  });
  
  console.log('All routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error);
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '陇渭本草电商运营平台 API 服务正常运行' });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});