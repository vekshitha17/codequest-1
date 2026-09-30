import express from 'express';
import { getChallenges, getChallengeById, submitChallenge } from '../controllers/codingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/:id/submit', protect, submitChallenge);

export default router;
