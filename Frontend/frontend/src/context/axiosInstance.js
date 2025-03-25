import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_PUBLIC_URL;
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, 
});

export default axiosInstance;
