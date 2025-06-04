import axios from 'axios';

const API_BASE = 'http://<YOUR_BACKEND_IP>:8080/api'; // Update IP as needed

export const api = axios.create({
  baseURL: API_BASE,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
