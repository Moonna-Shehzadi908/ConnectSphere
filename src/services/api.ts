import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  console.log("TOKEN =", token);
  console.log("HEADER BEFORE =", config.headers);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("HEADER AFTER =", config.headers);

  return config;
});

export default api;