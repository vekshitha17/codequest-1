import API from './api';

export const getQuizzes = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/quizzes?${query}` : '/quizzes';
  const response = await API.get(url);
  return response.data;
};

export const getQuizById = async (id) => {
  const response = await API.get(`/quizzes/${id}`);
  return response.data;
};

export const submitQuiz = async (id, answers) => {
  const response = await API.post(`/quizzes/${id}/submit`, { answers });
  return response.data;
};
