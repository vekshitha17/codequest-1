import express from 'express';
import jwt from 'jsonwebtoken';
import { getTopics, getTopicById } from '../controllers/topicController.js';
import User from '../models/User.js';
import { JWT_SECRET } from '../utils/helpers.js';

const router = express.Router();

// Optional authentication middleware so we can personalize unlock state if logged in
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    } catch (e) {
      // Proceed unauthenticated
    }
  }
  next();
};

router.get('/', optionalAuth, getTopics);
router.get('/:id', optionalAuth, getTopicById);

export default router;
