import axios from "axios";

const API = axios.create({
  baseURL: "https://e-book-management-system-kitab-ghar.onrender.com/api/v1",
});

export default API;
