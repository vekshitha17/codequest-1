import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './server/config/db.js';
import { seedDatabase } from './server/seed/seedData.js';
import { notFound, errorHandler } from './server/middleware/errorMiddleware.js';

// Route imports
import authRoutes from './server/routes/authRoutes.js';
import userRoutes from './server/routes/userRoutes.js';
import topicRoutes from './server/routes/topicRoutes.js';
import gameRoutes from './server/routes/gameRoutes.js';
import quizRoutes from './server/routes/quizRoutes.js';
import codingRoutes from './server/routes/codingRoutes.js';
import progressRoutes from './server/routes/progressRoutes.js';
import adminRoutes from './server/routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Basic middleware
  app.use(cors({
    origin: '*',
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // System & Health Status Endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'online',
      app: 'CodeQuest Full-Stack Engine',
      tagline: 'Learn • Play • Code • Conquer',
      timestamp: new Date().toISOString(),
      database: getDBStatus(),
    });
  });

  // Manual seed endpoint
  app.post('/api/seed', async (req, res) => {
    try {
      await seedDatabase();
      res.status(200).json({ success: true, message: 'Database seeded successfully' });
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/topics', topicRoutes);
  app.use('/api/games', gameRoutes);
  app.use('/api/quizzes', quizRoutes);
  app.use('/api/coding', codingRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/admin', adminRoutes);

  // In development, hook up Vite dev server middlewares
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Error Handlers for API
  app.use('/api/*', notFound);
  app.use(errorHandler);

  // Bind to PORT immediately so Cloud Run health check / startup probe succeeds instantly
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ CodeQuest Full-Stack server is live on http://0.0.0.0:${PORT}`);
  });

  // Connect to MongoDB Atlas and seed initial data in background without blocking server startup
  connectDB()
    .then(async () => {
      try {
        await seedDatabase();
      } catch (err: any) {
        console.warn('Background seed warning:', err?.message || err);
      }
    })
    .catch((err: any) => {
      console.warn('Background connectDB notice:', err?.message || err);
    });
}

startServer().catch((err) => {
  console.error('Fatal error starting CodeQuest server:', err);
});
