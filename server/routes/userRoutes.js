import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUserProgress,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All user routes are protected

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.get('/progress', getUserProgress);

export default router;
