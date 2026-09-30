import Game from '../models/Game.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import Topic from '../models/Topic.js';
import { calculateLevel, checkAchievements } from '../utils/helpers.js';

// @desc    Get all games
// @route   GET /api/games
// @access  Public / Private
export const getGames = async (req, res, next) => {
  try {
    const { world, topicId } = req.query;
    const query = {};
    if (world) query.world = world;
    if (topicId) query.topicId = topicId;

    const games = await Game.find(query);

    res.status(200).json({
      success: true,
      count: games.length,
      games,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single game by ID
// @route   GET /api/games/:id
// @access  Public / Private
export const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      game,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete game & award XP
// @route   POST /api/games/:id/complete
// @access  Private
export const completeGame = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found with specified identifier',
      });
    }

    const userId = String(req.user.id || req.user._id);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { score = 100, attempts = 1 } = req.body;
    const gameId = String(game._id || game.id);
    const topicId = String(game.topicId);

    // Check if user already completed this game
    const alreadyCompleted = (user.completedGames || []).includes(gameId);
    const xpReward = alreadyCompleted ? 0 : (game.xpReward || 20);

    const updatedCompletedGames = alreadyCompleted
      ? user.completedGames
      : [...(user.completedGames || []), gameId];

    const newXP = (user.xp || 0) + xpReward;
    const newLevel = calculateLevel(newXP);

    // Update or create Progress record for this topic
    let progress = await Progress.findOne({ userId, topicId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        topicId,
        world: game.world,
        gameCompleted: true,
        quizCompleted: false,
        codingCompleted: false,
        completed: false,
        score,
        xpEarned: xpReward,
        attempts,
        lastAccessed: new Date(),
      });
    } else {
      progress = await Progress.findByIdAndUpdate(progress._id || progress.id, {
        gameCompleted: true,
        score: Math.max(progress.score || 0, score),
        xpEarned: (progress.xpEarned || 0) + xpReward,
        attempts: (progress.attempts || 1) + 1,
        lastAccessed: new Date(),
      });
    }

    // Check achievements
    const achievementCheck = checkAchievements({
      ...user,
      xp: newXP,
      completedGames: updatedCompletedGames,
    });

    await User.findByIdAndUpdate(userId, {
      xp: newXP,
      level: newLevel,
      completedGames: updatedCompletedGames,
      achievements: achievementCheck.updatedAchievements,
    });

    res.status(200).json({
      success: true,
      message: alreadyCompleted
        ? 'Great job practicing again! (XP already claimed)'
        : `Victory! Game completed and +${xpReward} XP earned!`,
      xpEarned: xpReward,
      totalXP: newXP,
      level: newLevel,
      alreadyCompleted,
      newAchievements: achievementCheck.newlyUnlocked,
      gameId,
      progress,
    });
  } catch (error) {
    next(error);
  }
};
