// auth.js

import axios from "axios";
import jwt_decode from "jwt-decode";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend API URL

export function signup(username, password, name, email) {
  return axios.post(`${API_BASE_URL}/auth/signup`, {
    username,
    password,
    name,
    email,
  });
}

export function login(username, password) {
  return axios.post(`${API_BASE_URL}/auth/login`, { username, password });
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwt_decode(token);
    return decoded;
  }
  return null;
}
