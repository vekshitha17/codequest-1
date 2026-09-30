import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const topicSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    world: {
      type: String,
      enum: ['python', 'dsa', 'adventure'],
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    description: {
      type: String,
      required: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    explanation: {
      type: String,
      required: true,
    },
    syntax: {
      type: String,
      default: '',
    },
    examples: [
      {
        title: String,
        code: String,
        output: String,
        notes: String,
      },
    ],
    keyPoints: {
      type: [String],
      default: [],
    },
    commonMistakes: {
      type: [String],
      default: [],
    },
    gameId: {
      type: String,
      default: null,
    },
    quizId: {
      type: String,
      default: null,
    },
    challengeId: {
      type: String,
      default: null,
    },
    xpReward: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = createDualModel('Topic', topicSchema, 'topics');

export default Topic;
