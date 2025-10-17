import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://connectify-skro.onrender.com/api/", 
    withCredentials: true, 
})

makeRequest.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );