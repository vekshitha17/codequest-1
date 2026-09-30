import mongoose from 'mongoose';
import { createDualModel } from './modelStore.js';

const achievementSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['python', 'dsa', 'streak', 'mastery'],
      default: 'mastery',
    },
    xpBonus: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = createDualModel('Achievement', achievementSchema, 'achievements');

export default Achievement;
