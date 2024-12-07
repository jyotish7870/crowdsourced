import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default service;
