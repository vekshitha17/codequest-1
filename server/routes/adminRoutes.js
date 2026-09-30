import express from 'express';
import {
  getAllUsers,
  getAdminStatistics,
  createTopic,
  updateTopic,
  deleteTopic,
  createGame,
  updateGame,
  deleteGame,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Enforce auth + admin on all /api/admin routes
router.use(protect);
router.use(admin);

router.get('/users', getAllUsers);
router.get('/statistics', getAdminStatistics);

// Topic management
router.post('/topics', createTopic);
router.put('/topics/:id', updateTopic);
router.delete('/topics/:id', deleteTopic);

// Game management
router.post('/games', createGame);
router.put('/games/:id', updateGame);
router.delete('/games/:id', deleteGame);

// Quiz management
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// Challenge management
router.post('/challenges', createChallenge);
router.put('/challenges/:id', updateChallenge);
router.delete('/challenges/:id', deleteChallenge);

export default router;
