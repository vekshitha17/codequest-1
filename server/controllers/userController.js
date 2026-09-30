import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { calculateLevel, getNextLevelThreshold } from '../utils/helpers.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
      });
    }

    const level = calculateLevel(user.xp || 0);

    res.status(200).json({
      success: true,
      user: {
        id: user._id || user.id,
        _id: user._id || user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        xp: user.xp || 0,
        level,
        nextLevelXP: getNextLevelThreshold(level),
        completedTopics: user.completedTopics || [],
        completedGames: user.completedGames || [],
        completedQuizzes: user.completedQuizzes || [],
        completedChallenges: user.completedChallenges || [],
        currentWorld: user.currentWorld || 'python',
        achievements: user.achievements || [],
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { username, avatar, currentWorld } = req.body;
    const updates = {};

    if (username && username.trim() !== '') {
      // Check if username taken by another user
      const existing = await User.findOne({ username: username.trim() });
      if (existing && String(existing._id || existing.id) !== String(user._id || user.id)) {
        return res.status(409).json({
          success: false,
          message: 'Username is already taken by another adventurer',
        });
      }
      updates.username = username.trim();
    }

    if (avatar) updates.avatar = avatar;
    if (currentWorld) updates.currentWorld = currentWorld;

    const updatedUser = await User.findByIdAndUpdate(user._id || user.id, updates);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser._id || updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        xp: updatedUser.xp,
        level: calculateLevel(updatedUser.xp || 0),
        currentWorld: updatedUser.currentWorld,
        achievements: updatedUser.achievements || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user aggregate progress
// @route   GET /api/users/progress
// @access  Private
export const getUserProgress = async (req, res, next) => {
  try {
    const userId = String(req.user.id || req.user._id);
    const progressList = await Progress.find({ userId });
    const user = await User.findById(userId);

    const pythonProgress = progressList.filter(p => p.world === 'python' && p.completed).length;
    const dsaProgress = progressList.filter(p => p.world === 'dsa' && p.completed).length;
    const adventureProgress = progressList.filter(p => p.world === 'adventure' && p.completed).length;

    res.status(200).json({
      success: true,
      progress: {
        totalXP: user ? user.xp : 0,
        level: calculateLevel(user ? user.xp : 0),
        completedTopicsCount: (user?.completedTopics || []).length,
        completedGamesCount: (user?.completedGames || []).length,
        completedQuizzesCount: (user?.completedQuizzes || []).length,
        completedChallengesCount: (user?.completedChallenges || []).length,
        worldCounts: {
          python: pythonProgress,
          dsa: dsaProgress,
          adventure: adventureProgress,
        },
        records: progressList,
      },
    });
  } catch (error) {
    next(error);
  }
};
