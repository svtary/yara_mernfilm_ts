import axios from 'axios';
import queryString from 'query-string';

// const baseURL = "https://moonflix-api.vercel.app/api/v1/";
// const baseURL = "http://l27.0.0.1:5000/api/v1/";
// const baseURL = "http://localho5t:8080/api/v1/";
// const baseURL = "http://localhost:3000/api/v1/";
const baseURL = 'http://localhost:8800/api/v1';
// const baseURL = 'http://8.130.83.89/api/v1';
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('actkn')}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
