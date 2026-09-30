import API from './api';

export const getGames = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/games?${query}` : '/games';
  const response = await API.get(url);
  return response.data;
};

export const getGameById = async (id) => {
  const response = await API.get(`/games/${id}`);
  return response.data;
};

export const completeGame = async (id, resultData) => {
  const response = await API.post(`/games/${id}/complete`, resultData);
  return response.data;
};
