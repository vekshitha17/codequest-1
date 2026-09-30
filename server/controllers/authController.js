import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken, calculateLevel, getNextLevelThreshold } from '../utils/helpers.js';

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: username, email, and password',
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.email.toLowerCase() === email.toLowerCase()
          ? 'An account with this email address already exists'
          : 'This username is already taken. Please pick another one!',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student',
      avatar: 'robot_avatar_1',
      xp: 0,
      level: 1,
      completedTopics: [],
      completedGames: [],
      completedQuizzes: [],
      completedChallenges: [],
      achievements: ['welcome_badge'],
    });

    res.status(201).json({
      success: true,
      message: 'Account successfully registered! You can now log into CodeQuest.',
      user: {
        id: user._id || user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { emailOrUsername, email, username, password } = req.body;
    const identifier = emailOrUsername || email || username;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or username and password',
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User account was not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your password.',
      });
    }

    const token = generateToken(user._id || user.id, user.role);

    res.status(200).json({
      success: true,
      message: 'Welcome back to CodeQuest!',
      token,
      user: {
        id: user._id || user.id,
        _id: user._id || user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        xp: user.xp || 0,
        level: calculateLevel(user.xp || 0),
        nextLevelXP: getNextLevelThreshold(calculateLevel(user.xp || 0)),
        completedTopics: user.completedTopics || [],
        completedGames: user.completedGames || [],
        completedQuizzes: user.completedQuizzes || [],
        completedChallenges: user.completedChallenges || [],
        currentWorld: user.currentWorld || 'python',
        achievements: user.achievements || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const currentLevel = calculateLevel(user.xp || 0);
    const nextLevelXP = getNextLevelThreshold(currentLevel);

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
        level: currentLevel,
        nextLevelXP,
        completedTopics: user.completedTopics || [],
        completedGames: user.completedGames || [],
        completedQuizzes: user.completedQuizzes || [],
        completedChallenges: user.completedChallenges || [],
        currentWorld: user.currentWorld || 'python',
        achievements: user.achievements || [],
      },
    });
  } catch (error) {
    next(error);
  }
};
