import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'codequest_super_secret_jwt_key_2026_gamified';

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const calculateLevel = (xp) => {
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 650) return 4;
  if (xp >= 350) return 3;
  if (xp >= 150) return 2;
  return 1;
};

export const getNextLevelThreshold = (currentLevel) => {
  const thresholds = {
    1: 150,
    2: 350,
    3: 650,
    4: 1000,
    5: 1500,
    6: 2500,
  };
  return thresholds[currentLevel] || (currentLevel * 500);
};

export const checkAchievements = (user, context = {}) => {
  const currentAchievements = new Set(user.achievements || []);
  const newUnlocked = [];

  // Novice Coder: First topic completed
  if ((user.completedTopics || []).length >= 1 && !currentAchievements.has('first_topic')) {
    currentAchievements.add('first_topic');
    newUnlocked.push({ id: 'first_topic', title: 'First Step', description: 'Completed your very first topic!' });
  }

  // Quiz Master: 3 quizzes completed
  if ((user.completedQuizzes || []).length >= 3 && !currentAchievements.has('quiz_whiz')) {
    currentAchievements.add('quiz_whiz');
    newUnlocked.push({ id: 'quiz_whiz', title: 'Quiz Whiz', description: 'Aced 3 quizzes with flying colors!' });
  }

  // Game Knight: 3 games completed
  if ((user.completedGames || []).length >= 3 && !currentAchievements.has('game_knight')) {
    currentAchievements.add('game_knight');
    newUnlocked.push({ id: 'game_knight', title: 'Arcade Knight', description: 'Conquered 3 interactive minigames!' });
  }

  // Python Pioneer: 5 Python topics completed
  const pythonCount = (user.completedTopics || []).filter(t => t.startsWith('py_')).length;
  if (pythonCount >= 5 && !currentAchievements.has('python_pioneer')) {
    currentAchievements.add('python_pioneer');
    newUnlocked.push({ id: 'python_pioneer', title: 'Python Pioneer', description: 'Completed 5 Python world topics!' });
  }

  // DSA Explorer: 5 DSA topics completed
  const dsaCount = (user.completedTopics || []).filter(t => t.startsWith('dsa_')).length;
  if (dsaCount >= 5 && !currentAchievements.has('dsa_explorer')) {
    currentAchievements.add('dsa_explorer');
    newUnlocked.push({ id: 'dsa_explorer', title: 'DSA Explorer', description: 'Navigated 5 Data Structure topics!' });
  }

  // XP Centurion: Reached 500 XP
  if ((user.xp || 0) >= 500 && !currentAchievements.has('xp_centurion')) {
    currentAchievements.add('xp_centurion');
    newUnlocked.push({ id: 'xp_centurion', title: 'XP Centurion', description: 'Amassed over 500 total XP points!' });
  }

  return {
    updatedAchievements: Array.from(currentAchievements),
    newlyUnlocked: newUnlocked,
  };
};
