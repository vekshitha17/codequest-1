import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const codingChallengeSchema = new mongoose.Schema(
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
    topicId: {
      type: String,
      required: true,
    },
    world: {
      type: String,
      enum: ['python', 'dsa', 'adventure'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'],
      default: 'Easy',
    },
    problem: {
      type: String,
      required: true,
    },
    inputFormat: {
      type: String,
      default: '',
    },
    outputFormat: {
      type: String,
      default: '',
    },
    constraints: {
      type: String,
      default: '',
    },
    starterCode: {
      type: String,
      required: true,
    },
    solutionCode: {
      type: String,
      default: '',
    },
    testCases: [
      {
        id: String,
        input: String,
        expectedOutput: String,
        description: String,
        hidden: {
          type: Boolean,
          default: false,
        },
      },
    ],
    xpReward: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const CodingChallenge = createDualModel('CodingChallenge', codingChallengeSchema, 'codingchallenges');

export default CodingChallenge;
