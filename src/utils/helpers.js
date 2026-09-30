import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#A78BFA', '#F472B6', '#38BDF8', '#34D399', '#FBBF24'],
  });
};

export const calculateLevel = (xp = 0) => {
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 650) return 4;
  if (xp >= 350) return 3;
  if (xp >= 150) return 2;
  return 1;
};

export const getNextLevelThreshold = (currentLevel = 1) => {
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

export const getLevelTitle = (level = 1) => {
  const titles = {
    1: 'Code Novice',
    2: 'Syntax Apprentice',
    3: 'Algorithm Adventurer',
    4: 'Structure Knight',
    5: 'Binary Sage',
    6: 'CodeQuest Grandmaster',
  };
  return titles[level] || 'Elite Programmer';
};

export const getWorldMeta = (world) => {
  switch (world) {
    case 'python':
      return {
        title: 'Python World',
        tagline: 'The Serpent Realm of Syntax & Logic',
        color: 'from-emerald-400 to-teal-500',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        lightBg: 'bg-emerald-50/50',
      };
    case 'dsa':
      return {
        title: 'DSA Citadel',
        tagline: 'The Tower of Algorithms & Data Structures',
        color: 'from-indigo-400 to-purple-500',
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        lightBg: 'bg-indigo-50/50',
      };
    case 'adventure':
      return {
        title: 'Adventure Realm',
        tagline: 'Where Python Meets Algorithmic Mastery',
        color: 'from-amber-400 to-pink-500',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        lightBg: 'bg-amber-50/50',
      };
    default:
      return {
        title: 'CodeQuest',
        tagline: 'Learn • Play • Code • Conquer',
        color: 'from-purple-400 to-indigo-500',
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
        lightBg: 'bg-purple-50/50',
      };
  }
};
