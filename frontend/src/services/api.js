import axios from "axios";

const api = axios.create({
  baseURL: "https://scan-once-business.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;