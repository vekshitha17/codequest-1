import API from './api';

const topicCache = new Map();
const CACHE_TTL_MS = 15000; // 15-second client cache to prevent repeated identical network round-trips

export const getTopics = async (world) => {
  const token = localStorage.getItem('cq_token') || 'anon';
  const cacheKey = `${token}:${world || 'all'}`;
  const cached = topicCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = world ? `/topics?world=${world}` : '/topics';
  const response = await API.get(url);
  topicCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  return response.data;
};

export const clearTopicCache = () => {
  topicCache.clear();
};

export const getTopicById = async (id) => {
  const response = await API.get(`/topics/${id}`);
  return response.data;
};
