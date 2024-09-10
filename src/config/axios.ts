import { COOKIES_KEY } from "@/constants/key";
import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: "https://realitycode-server.vercel.app/api",
  // baseURL: "http://localhost:5000",
  // baseURL: "http://192.168.100.24:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(COOKIES_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
