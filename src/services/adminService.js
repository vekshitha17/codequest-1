import API from './api';

export const getAdminUsers = async () => {
  const response = await API.get('/admin/users');
  return response.data;
};

export const getAdminStatistics = async () => {
  const response = await API.get('/admin/statistics');
  return response.data;
};

// TOPICS CRUD
export const adminCreateTopic = async (topicData) => {
  const response = await API.post('/admin/topics', topicData);
  return response.data;
};

export const adminUpdateTopic = async (id, topicData) => {
  const response = await API.put(`/admin/topics/${id}`, topicData);
  return response.data;
};

export const adminDeleteTopic = async (id) => {
  const response = await API.delete(`/admin/topics/${id}`);
  return response.data;
};

// GAMES CRUD
export const adminCreateGame = async (gameData) => {
  const response = await API.post('/admin/games', gameData);
  return response.data;
};

export const adminUpdateGame = async (id, gameData) => {
  const response = await API.put(`/admin/games/${id}`, gameData);
  return response.data;
};

export const adminDeleteGame = async (id) => {
  const response = await API.delete(`/admin/games/${id}`);
  return response.data;
};

// QUIZZES CRUD
export const adminCreateQuiz = async (quizData) => {
  const response = await API.post('/admin/quizzes', quizData);
  return response.data;
};

export const adminUpdateQuiz = async (id, quizData) => {
  const response = await API.put(`/admin/quizzes/${id}`, quizData);
  return response.data;
};

export const adminDeleteQuiz = async (id) => {
  const response = await API.delete(`/admin/quizzes/${id}`);
  return response.data;
};

// CHALLENGES CRUD
export const adminCreateChallenge = async (challengeData) => {
  const response = await API.post('/admin/challenges', challengeData);
  return response.data;
};

export const adminUpdateChallenge = async (id, challengeData) => {
  const response = await API.put(`/admin/challenges/${id}`, challengeData);
  return response.data;
};

export const adminDeleteChallenge = async (id) => {
  const response = await API.delete(`/admin/challenges/${id}`);
  return response.data;
};
