import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
console.log('API BASE URL:', import.meta.env.VITE_API_BASE_URL);



export default api;