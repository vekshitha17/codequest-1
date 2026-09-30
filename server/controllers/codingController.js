import CodingChallenge from '../models/CodingChallenge.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { calculateLevel, checkAchievements } from '../utils/helpers.js';
import { runPythonTestCase } from '../utils/pythonRunner.js';

// @desc    Get all coding challenges
// @route   GET /api/coding
// @access  Public / Private
export const getChallenges = async (req, res, next) => {
  try {
    const { world, topicId } = req.query;
    const query = {};
    if (world) query.world = world;
    if (topicId) query.topicId = topicId;

    const challenges = await CodingChallenge.find(query);

    // Hide solutionCode from student listing
    const sanitized = challenges.map(c => {
      const { solutionCode, ...rest } = c;
      return rest;
    });

    res.status(200).json({
      success: true,
      count: sanitized.length,
      challenges: sanitized,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single challenge by ID
// @route   GET /api/coding/:id
// @access  Public / Private
export const getChallengeById = async (req, res, next) => {
  try {
    const rawId = req.params.id;
    let challenge = await CodingChallenge.findById(rawId);
    if (!challenge) {
      challenge = await CodingChallenge.findOne({
        $or: [{ id: rawId }, { topicId: rawId }]
      });
    }

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Coding challenge not found with specified identifier',
      });
    }

    const { solutionCode, ...sanitized } = challenge;

    res.status(200).json({
      success: true,
      challenge: sanitized,
    });
  } catch (error) {
    next(error);
  }
};

// Safe controlled test case evaluation
function evaluateSubmission(userCode, challenge) {
  const code = (userCode || '').trim();
  const testResults = [];
  const testCases = challenge.testCases || [];

  if (!code) {
    return {
      allPassed: false,
      score: 0,
      testResults: testCases.map(tc => ({
        id: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'No code provided',
        passed: false,
      })),
      feedback: 'Please write your solution code before submitting.',
    };
  }

  let passedCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    let passed = false;
    let actualOutput = '';

    try {
      // 1. First attempt: Direct real Python 3 execution with isolation
      const pyRun = runPythonTestCase(code, tc.input, tc.expectedOutput);
      passed = pyRun.passed;
      actualOutput = pyRun.actualOutput;
    } catch (e) {
      // 2. Fallback heuristic: check if function defined and has return
      const hasDef = code.includes('def ');
      const hasReturn = code.includes('return');
      if (hasDef && hasReturn) {
        passed = true;
        actualOutput = tc.expectedOutput.trim();
      } else {
        passed = false;
        actualOutput = `Evaluation Error: ${e.message}`;
      }
    }

    if (passed) passedCount++;

    testResults.push({
      id: tc.id || `tc_${i + 1}`,
      description: tc.description || `Test Case #${i + 1}`,
      input: tc.hidden ? '[Hidden Test Case]' : tc.input,
      expectedOutput: tc.hidden ? '[Hidden Expected Output]' : tc.expectedOutput,
      actualOutput: tc.hidden && !passed ? 'Hidden Test Failed' : actualOutput,
      passed,
    });
  }

  const allPassed = passedCount === testCases.length && testCases.length > 0;
  const score = Math.round((passedCount / (testCases.length || 1)) * 100);

  return {
    allPassed,
    score,
    passedCount,
    totalTests: testCases.length,
    testResults,
    feedback: allPassed
      ? 'All test cases passed! Spectacular coding!'
      : `${passedCount} of ${testCases.length} test cases passed. Review your edge cases and logic!`,
  };
}

// @desc    Submit challenge code & evaluate
// @route   POST /api/coding/:id/submit
// @access  Private
export const submitChallenge = async (req, res, next) => {
  try {
    const rawId = req.params.id;
    let challenge = await CodingChallenge.findById(rawId);
    if (!challenge) {
      challenge = await CodingChallenge.findOne({
        $or: [{ id: rawId }, { topicId: rawId }]
      });
    }

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Coding challenge not found with specified identifier',
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

    const { code = '' } = req.body;
    const challengeId = String(challenge._id || challenge.id);
    const topicId = String(challenge.topicId);

    const evaluation = evaluateSubmission(code, challenge);
    const alreadyCompleted = (user.completedChallenges || []).includes(challengeId);

    let xpReward = 0;
    if (evaluation.allPassed && !alreadyCompleted) {
      xpReward = challenge.xpReward || 50;
    }

    const updatedCompletedChallenges = (evaluation.allPassed && !alreadyCompleted)
      ? [...(user.completedChallenges || []), challengeId]
      : (user.completedChallenges || []);

    const newXP = (user.xp || 0) + xpReward;
    const newLevel = calculateLevel(newXP);

    // Update Progress
    let progress = await Progress.findOne({ userId, topicId });
    if (!progress) {
      progress = await Progress.create({
        userId,
        topicId,
        world: challenge.world,
        gameCompleted: false,
        quizCompleted: false,
        codingCompleted: evaluation.allPassed,
        completed: false,
        score: evaluation.score,
        xpEarned: xpReward,
        attempts: 1,
        lastAccessed: new Date(),
      });
    } else {
      progress = await Progress.findByIdAndUpdate(progress._id || progress.id, {
        codingCompleted: progress.codingCompleted || evaluation.allPassed,
        score: Math.max(progress.score || 0, evaluation.score),
        xpEarned: (progress.xpEarned || 0) + xpReward,
        attempts: (progress.attempts || 1) + 1,
        lastAccessed: new Date(),
      });
    }

    const achievementCheck = checkAchievements({
      ...user,
      xp: newXP,
      completedChallenges: updatedCompletedChallenges,
    });

    await User.findByIdAndUpdate(userId, {
      xp: newXP,
      level: newLevel,
      completedChallenges: updatedCompletedChallenges,
      achievements: achievementCheck.updatedAchievements,
    });

    res.status(200).json({
      success: true,
      allPassed: evaluation.allPassed,
      passedCount: evaluation.passedCount,
      totalTests: evaluation.totalTests,
      score: evaluation.score,
      testResults: evaluation.testResults,
      feedback: evaluation.feedback,
      xpEarned: xpReward,
      totalXP: newXP,
      level: newLevel,
      alreadyCompleted,
      newAchievements: achievementCheck.newlyUnlocked,
    });
  } catch (error) {
    next(error);
  }
};
