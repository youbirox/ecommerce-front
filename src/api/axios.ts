import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le JWT

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// Gérer expiration session

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
export default api;
