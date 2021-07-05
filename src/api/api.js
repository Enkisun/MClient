import axios from "axios";

const API_BASE = "http://localhost:5000";
axios.defaults.baseURL = API_BASE;

export const fetchRegister = async (email, password) =>
  await axios.post(`/register`, { email, password });

export const fetchLogin = async (email, password) =>
  await axios.post(`/login`, { email, password });
