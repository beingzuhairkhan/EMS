import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, // Required for cookies
});

export default axiosInstance;
