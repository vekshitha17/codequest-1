import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { seedDatabase } from './seed/seedData.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

export const createServer = () => {
  const app = express();

  // Middleware
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
      app: 'CodeQuest API Engine',
      tagline: 'Learn • Play • Code • Conquer',
      timestamp: new Date().toISOString(),
      database: getDBStatus(),
    });
  });

  // Manual re-seed trigger endpoint for testing or admin
  app.post('/api/seed', async (req, res) => {
    try {
      await seedDatabase();
      res.status(200).json({ success: true, message: 'Database seeded successfully' });
    } catch (e) {
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

  // Error Handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

// Standalone execution support
export const startStandaloneServer = async () => {
  await connectDB();
  await seedDatabase();

  const app = createServer();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 CodeQuest Backend running on port ${PORT}`);
  });
};

if (process.env.NODE_ENV !== 'test' && process.argv[1]?.endsWith('server.js')) {
  startStandaloneServer();
}

export default createServer;
