import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../utils/helpers.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists or authorization token is invalid.',
        });
      }

      // Exclude password from req.user
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed verification',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no Bearer token provided',
    });
  }
};
