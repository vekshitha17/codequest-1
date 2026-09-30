import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topicId: {
      type: String,
      required: true,
    },
    world: {
      type: String,
      enum: ['python', 'dsa', 'adventure'],
      required: true,
    },
    passingPercentage: {
      type: Number,
      default: 70,
    },
    xpReward: {
      type: Number,
      default: 20,
    },
    questions: [
      {
        id: String,
        question: {
          type: String,
          required: true,
        },
        codeSnippet: String,
        options: {
          type: [String],
          required: true,
          validate: [arr => arr.length === 4, 'Quiz question must have 4 options'],
        },
        correctAnswer: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
        explanation: {
          type: String,
          default: '',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = createDualModel('Quiz', quizSchema, 'quizzes');

export default Quiz;
