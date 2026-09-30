import API from './api';
import { clearTopicCache } from './topicService';

export const getProgress = async () => {
  const response = await API.get('/progress');
  return response.data;
};

export const getTopicProgress = async (topicId) => {
  const response = await API.get(`/progress/${topicId}`);
  return response.data;
};

export const recordProgress = async (data) => {
  const response = await API.post('/progress', data);
  clearTopicCache();
  return response.data;
};

export const updateProgressRecord = async (id, data) => {
  const response = await API.put(`/progress/${id}`, data);
  clearTopicCache();
  return response.data;
};
