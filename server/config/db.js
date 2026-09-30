import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded from root workspace or cwd
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

let isConnected = false;
let dbMode = 'disconnected'; // 'atlas' | 'disconnected'
let connectionError = null;

// Helper to sanitize any credentials or connection URI patterns from logs and responses
const sanitizeErrorMessage = (msg) => {
  if (!msg || typeof msg !== 'string') return '';
  return msg
    .replace(/mongodb(\+srv)?:\/\/[^@\s]+@/gi, 'mongodb$1://***:***@')
    .replace(/password=[^&\s]+/gi, 'password=***');
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    isConnected = false;
    dbMode = 'disconnected';
    connectionError = 'MONGODB_URI is not set in environment (.env).';
    console.warn(`⚠️ MongoDB Connection Notice: ${connectionError}`);
    return { isConnected: false, mode: dbMode, error: connectionError };
  }

  try {
    console.log('🔄 Attempting connection to MongoDB Atlas with Mongoose...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    dbMode = 'atlas';
    connectionError = null;
    console.log('✅ Connected successfully to MongoDB Atlas!');
    return { isConnected: true, mode: 'atlas' };
  } catch (err) {
    isConnected = false;
    dbMode = 'disconnected';
    const cleanError = sanitizeErrorMessage(err.message || String(err));
    connectionError = cleanError;
    console.warn(`⚠️ MongoDB Atlas Connection Notice: ${cleanError}`);
    return { isConnected: false, mode: 'disconnected', error: cleanError };
  }
};

export const getDBStatus = () => ({
  isConnected,
  mode: isConnected ? 'atlas' : dbMode,
  databaseName: isConnected ? (mongoose.connection.name || 'codequest') : null,
  ...(connectionError ? { error: connectionError } : {}),
});
