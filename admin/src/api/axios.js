import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // adjust if needed
  withCredentials: true, // IMPORTANT for cookies
});

export default api;
