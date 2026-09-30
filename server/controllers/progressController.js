import Progress from '../models/Progress.js';
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import { calculateLevel, checkAchievements } from '../utils/helpers.js';

// @desc    Get user's all progress
// @route   GET /api/progress
// @access  Private
export const getProgress = async (req, res, next) => {
  try {
    const userId = String(req.user.id || req.user._id);
    const progressList = await Progress.find({ userId });

    const totalTopics = await Topic.countDocuments();
    const pythonTotal = await Topic.countDocuments({ world: 'python' });
    const dsaTotal = await Topic.countDocuments({ world: 'dsa' });
    const adventureTotal = await Topic.countDocuments({ world: 'adventure' });

    const completedTopics = progressList.filter(p => p.completed);
    const pythonDone = completedTopics.filter(p => p.world === 'python').length;
    const dsaDone = completedTopics.filter(p => p.world === 'dsa').length;
    const adventureDone = completedTopics.filter(p => p.world === 'adventure').length;

    const stats = {
      overallPercentage: totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0,
      pythonPercentage: pythonTotal > 0 ? Math.round((pythonDone / pythonTotal) * 100) : 0,
      dsaPercentage: dsaTotal > 0 ? Math.round((dsaDone / dsaTotal) * 100) : 0,
      adventurePercentage: adventureTotal > 0 ? Math.round((adventureDone / adventureTotal) * 100) : 0,
      completedTopicsCount: completedTopics.length,
      totalTopics,
    };

    res.status(200).json({
      success: true,
      stats,
      progress: progressList,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get progress for a specific topic
// @route   GET /api/progress/:topicId
// @access  Private
export const getTopicProgress = async (req, res, next) => {
  try {
    const userId = String(req.user.id || req.user._id);
    const topicId = String(req.params.topicId);

    let progress = await Progress.findOne({ userId, topicId });
    if (!progress) {
      progress = {
        userId,
        topicId,
        completed: false,
        gameCompleted: false,
        quizCompleted: false,
        codingCompleted: false,
        score: 0,
        xpEarned: 0,
        attempts: 0,
      };
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or record progress / Complete topic
// @route   POST /api/progress
// @access  Private
export const createProgress = async (req, res, next) => {
  try {
    const userId = String(req.user.id || req.user._id);
    const { topicId, markTopicCompleted = false, world } = req.body;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide topicId',
      });
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found with specified identifier',
      });
    }

    const user = await User.findById(userId);
    let progress = await Progress.findOne({ userId, topicId: String(topicId) });

    const alreadyTopicDone = (user.completedTopics || []).includes(String(topicId));
    let xpEarned = 0;

    // If marking completed
    const shouldMarkCompleted = markTopicCompleted || (progress && (progress.quizCompleted || progress.gameCompleted || progress.codingCompleted));

    if (shouldMarkCompleted && !alreadyTopicDone) {
      xpEarned = topic.xpReward || 20;
    }

    const updatedCompletedTopics = (shouldMarkCompleted && !alreadyTopicDone)
      ? [...(user.completedTopics || []), String(topicId)]
      : (user.completedTopics || []);

    const newXP = (user.xp || 0) + xpEarned;
    const newLevel = calculateLevel(newXP);

    if (!progress) {
      progress = await Progress.create({
        userId,
        topicId: String(topicId),
        world: world || topic.world,
        completed: shouldMarkCompleted,
        gameCompleted: req.body.gameCompleted || false,
        quizCompleted: req.body.quizCompleted || false,
        codingCompleted: req.body.codingCompleted || false,
        score: req.body.score || 100,
        xpEarned,
        attempts: 1,
        lastAccessed: new Date(),
      });
    } else {
      progress = await Progress.findByIdAndUpdate(progress._id || progress.id, {
        completed: shouldMarkCompleted || progress.completed,
        gameCompleted: req.body.gameCompleted !== undefined ? req.body.gameCompleted : progress.gameCompleted,
        quizCompleted: req.body.quizCompleted !== undefined ? req.body.quizCompleted : progress.quizCompleted,
        codingCompleted: req.body.codingCompleted !== undefined ? req.body.codingCompleted : progress.codingCompleted,
        xpEarned: (progress.xpEarned || 0) + xpEarned,
        attempts: (progress.attempts || 1) + 1,
        lastAccessed: new Date(),
      });
    }

    const achievementCheck = checkAchievements({
      ...user,
      xp: newXP,
      completedTopics: updatedCompletedTopics,
    });

    await User.findByIdAndUpdate(userId, {
      xp: newXP,
      level: newLevel,
      completedTopics: updatedCompletedTopics,
      achievements: achievementCheck.updatedAchievements,
    });

    res.status(201).json({
      success: true,
      message: shouldMarkCompleted && !alreadyTopicDone
        ? `Topic conquered! +${xpEarned} XP awarded and next topic unlocked! 🎉`
        : 'Progress tracked successfully',
      progress,
      xpEarned,
      totalXP: newXP,
      level: newLevel,
      completedTopics: updatedCompletedTopics,
      newAchievements: achievementCheck.newlyUnlocked,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update progress record
// @route   PUT /api/progress/:id
// @access  Private
export const updateProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found',
      });
    }

    const updated = await Progress.findByIdAndUpdate(req.params.id, {
      ...req.body,
      lastAccessed: new Date(),
    });

    res.status(200).json({
      success: true,
      message: 'Progress record updated',
      progress: updated,
    });
  } catch (error) {
    next(error);
  }
};
