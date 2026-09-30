import express from 'express';
import { getGames, getGameById, completeGame } from '../controllers/gameController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGames);
router.get('/:id', getGameById);
router.post('/:id/complete', protect, completeGame);

export default router;
