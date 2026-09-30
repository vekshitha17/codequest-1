import express from 'express';
import {
  getProgress,
  getTopicProgress,
  createProgress,
  updateProgress,
} from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All progress routes require authentication

router.route('/')
  .get(getProgress)
  .post(createProgress);

router.get('/:topicId', getTopicProgress);
router.put('/:id', updateProgress);

export default router;
