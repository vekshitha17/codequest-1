import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Game from '../models/Game.js';
import Quiz from '../models/Quiz.js';
import CodingChallenge from '../models/CodingChallenge.js';
import Progress from '../models/Progress.js';

// @desc    Get all registered users for admin
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const sanitized = users.map(u => {
      const { password, ...rest } = u;
      return rest;
    });

    res.status(200).json({
      success: true,
      count: sanitized.length,
      users: sanitized,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get overall administrative statistics
// @route   GET /api/admin/statistics
// @access  Private/Admin
export const getAdminStatistics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTopics = await Topic.countDocuments();
    const totalGames = await Game.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalChallenges = await CodingChallenge.countDocuments();
    const totalProgressRecords = await Progress.countDocuments();

    const pythonTopics = await Topic.countDocuments({ world: 'python' });
    const dsaTopics = await Topic.countDocuments({ world: 'dsa' });
    const adventureTopics = await Topic.countDocuments({ world: 'adventure' });

    const allProgress = await Progress.find({ completed: true });
    const avgScore = allProgress.length > 0
      ? Math.round(allProgress.reduce((sum, p) => sum + (p.score || 0), 0) / allProgress.length)
      : 85;

    res.status(200).json({
      success: true,
      statistics: {
        totalUsers,
        totalTopics,
        totalGames,
        totalQuizzes,
        totalChallenges,
        totalProgressRecords,
        topicsByWorld: {
          python: pythonTopics,
          dsa: dsaTopics,
          adventure: adventureTopics,
        },
        averageProgressScore: avgScore,
        activeStudents: Math.max(1, totalUsers - 1),
      },
    });
  } catch (error) {
    next(error);
  }
};

// --- TOPICS CRUD ---
export const createTopic = async (req, res, next) => {
  try {
    const { title, world, level, order, description, explanation } = req.body;
    if (!title || !world || !description || !explanation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required topic fields: title, world, description, explanation',
      });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const topic = await Topic.create({
      ...req.body,
      slug,
      order: order || 1,
      level: level || 1,
    });

    res.status(201).json({
      success: true,
      message: 'Topic created successfully',
      topic,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (req, res, next) => {
  try {
    const updated = await Topic.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Topic updated successfully',
      topic: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Topic deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// --- GAMES CRUD ---
export const createGame = async (req, res, next) => {
  try {
    const { title, world, type, instructions, topicId } = req.body;
    if (!title || !world || !type || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required game fields: title, world, type, instructions',
      });
    }

    const game = await Game.create({
      ...req.body,
      topicId: topicId || 'general',
      questions: req.body.questions || [],
      xpReward: req.body.xpReward || 20,
    });

    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      game,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGame = async (req, res, next) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Game not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Game updated successfully',
      game: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGame = async (req, res, next) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Game not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Game deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// --- QUIZZES CRUD ---
export const createQuiz = async (req, res, next) => {
  try {
    const { title, world, topicId, questions } = req.body;
    if (!title || !world || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, world, and an array of 4-option questions',
      });
    }

    const quiz = await Quiz.create({
      ...req.body,
      topicId: topicId || 'general',
      passingPercentage: req.body.passingPercentage || 70,
      xpReward: req.body.xpReward || 20,
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      quiz: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const deleted = await Quiz.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// --- CHALLENGES CRUD ---
export const createChallenge = async (req, res, next) => {
  try {
    const { title, world, problem, starterCode, topicId } = req.body;
    if (!title || !world || !problem || !starterCode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, world, problem description, and starterCode',
      });
    }

    const challenge = await CodingChallenge.create({
      ...req.body,
      topicId: topicId || 'general',
      testCases: req.body.testCases || [],
      xpReward: req.body.xpReward || 50,
    });

    res.status(201).json({
      success: true,
      message: 'Coding challenge created successfully',
      challenge,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (req, res, next) => {
  try {
    const updated = await CodingChallenge.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Challenge updated successfully',
      challenge: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChallenge = async (req, res, next) => {
  try {
    const deleted = await CodingChallenge.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found with specified identifier',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coding challenge deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
