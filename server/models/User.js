import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { createDualModel } from './modelStore.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    avatar: {
      type: String,
      default: 'robot_avatar_1',
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    completedTopics: {
      type: [String],
      default: [],
    },
    completedGames: {
      type: [String],
      default: [],
    },
    completedQuizzes: {
      type: [String],
      default: [],
    },
    completedChallenges: {
      type: [String],
      default: [],
    },
    currentWorld: {
      type: String,
      default: 'python',
    },
    achievements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = createDualModel('User', userSchema, 'users');

export default User;
