import API from './api';

export const getChallenges = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/coding?${query}` : '/coding';
  const response = await API.get(url);
  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await API.get(`/coding/${id}`);
  return response.data;
};

export const submitChallenge = async (id, code) => {
  const response = await API.post(`/coding/${id}/submit`, { code });
  return response.data;
};
