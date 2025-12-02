// src/services/AdminService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export async function saveAdminData(adminData) {
  return axios.post(`${BASE_URL}/admin/register`, adminData);
}

export async function loginAdmin(credentials) {
  try {
    // Only send the fields backend expects
    const payload = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await axios.post(`${BASE_URL}/admin/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      // If backend uses cookies/session
      // withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed:", error.response?.data || error.message);
    throw error; // propagate so Login.jsx can handle it
  }
}
