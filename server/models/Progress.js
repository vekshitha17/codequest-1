import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    world: {
      type: String,
      enum: ['python', 'dsa', 'adventure'],
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    gameCompleted: {
      type: Boolean,
      default: false,
    },
    quizCompleted: {
      type: Boolean,
      default: false,
    },
    codingCompleted: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    xpEarned: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
      default: 1,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = createDualModel('Progress', progressSchema, 'progresses');

export default Progress;
