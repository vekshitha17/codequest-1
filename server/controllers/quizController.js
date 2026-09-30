import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { calculateLevel, checkAchievements } from '../utils/helpers.js';

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public / Private
export const getQuizzes = async (req, res, next) => {
  try {
    const { world, topicId } = req.query;
    const query = {};
    if (world) query.world = world;
    if (topicId) query.topicId = topicId;

    const quizzes = await Quiz.find(query);

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public / Private
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found with specified identifier',
      });
    }

    // Hide correctAnswer if not submitted or for student test mode
    const sanitizedQuestions = quiz.questions.map(q => ({
      id: q.id,
      question: q.question,
      codeSnippet: q.codeSnippet,
      options: q.options,
    }));

    res.status(200).json({
      success: true,
      quiz: {
        ...quiz,
        questions: sanitizedQuestions,
        totalQuestions: quiz.questions.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit quiz answers and evaluate
// @route   POST /api/quizzes/:id/submit
// @access  Private
export const submitQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found with specified identifier',
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

    const { answers = {} } = req.body;
    // answers is an object: { questionIdOrIndex: chosenOptionIndex }
    const quizId = String(quiz._id || quiz.id);
    const topicId = String(quiz.topicId);

    let correctCount = 0;
    const detailedFeedback = quiz.questions.map((q, index) => {
      const chosen = answers[q.id] !== undefined ? Number(answers[q.id]) : Number(answers[index]);
      const isCorrect = chosen === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        id: q.id,
        question: q.question,
        chosen,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || 'Review the topic theory for details.',
      };
    });

    const totalQuestions = quiz.questions.length || 1;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passingThreshold = quiz.passingPercentage || 70;
    const passed = percentage >= passingThreshold;

    const alreadyPassed = (user.completedQuizzes || []).includes(quizId);
    let xpReward = 0;
    if (passed && !alreadyPassed) {
      xpReward = quiz.xpReward || 20;
    }

    const updatedCompletedQuizzes = (passed && !alreadyPassed)
      ? [...(user.completedQuizzes || []), quizId]
      : (user.completedQuizzes || []);

    const newXP = (user.xp || 0) + xpReward;
    const newLevel = calculateLevel(newXP);

    // Update Progress
    let progress = await Progress.findOne({ userId, topicId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        topicId,
        world: quiz.world,
        gameCompleted: false,
        quizCompleted: passed,
        codingCompleted: false,
        completed: false,
        score: percentage,
        xpEarned: xpReward,
        attempts: 1,
        lastAccessed: new Date(),
      });
    } else {
      progress = await Progress.findByIdAndUpdate(progress._id || progress.id, {
        quizCompleted: progress.quizCompleted || passed,
        score: Math.max(progress.score || 0, percentage),
        xpEarned: (progress.xpEarned || 0) + xpReward,
        attempts: (progress.attempts || 1) + 1,
        lastAccessed: new Date(),
      });
    }

    const achievementCheck = checkAchievements({
      ...user,
      xp: newXP,
      completedQuizzes: updatedCompletedQuizzes,
    });

    await User.findByIdAndUpdate(userId, {
      xp: newXP,
      level: newLevel,
      completedQuizzes: updatedCompletedQuizzes,
      achievements: achievementCheck.updatedAchievements,
    });

    res.status(200).json({
      success: true,
      passed,
      percentage,
      score: percentage,
      correctCount,
      totalQuestions,
      passingThreshold,
      xpEarned: xpReward,
      totalXP: newXP,
      level: newLevel,
      alreadyPassed,
      detailedFeedback,
      newAchievements: achievementCheck.newlyUnlocked,
      message: passed
        ? `Congratulations! You scored ${percentage}% and passed the quiz! 🏆`
        : `You scored ${percentage}%. You need ${passingThreshold}% to pass. Keep practicing!`,
    });
  } catch (error) {
    next(error);
  }
};
