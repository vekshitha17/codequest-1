import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const gameSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: [
        'list-treasure-hunt',
        'guess-output',
        'fix-code',
        'memory',
        'stack-tower',
        'queue-line',
        'array-scanner',
        'binary-search',
        'sorting-match',
        'algorithm-match',
      ],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    questions: [
      {
        id: String,
        prompt: String,
        codeSnippet: String,
        options: [String],
        correctAnswer: String,
        hint: String,
        explanation: String,
      },
    ],
    xpReward: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  }
);

const Game = createDualModel('Game', gameSchema, 'games');

export default Game;
