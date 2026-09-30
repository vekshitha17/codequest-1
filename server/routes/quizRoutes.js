import express from 'express';
import { getQuizzes, getQuizById, submitQuiz } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/submit', protect, submitQuiz);

export default router;
