import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O sessionStorage si lo usas ahí
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const API2 = axios.create({
  baseURL: import.meta.env.VITE_API_URL2,
  headers: {
    'Content-Type': 'application/json',
  },
});

API2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O sessionStorage si lo usas ahí
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API, API2 };

