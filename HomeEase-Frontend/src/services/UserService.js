
import axios from "axios";
import { USER_ENDPOINTS } from "../constants/APIConstant";

const BASE_URL = "http://localhost:8080/users"; // single controller

// -------------------- REGISTER --------------------
export async function saveData(formData) {
    const payload = {
        ...formData,
        // Map frontend role → backend enum
        role: formData.role === "admin" ? "ADMIN" : "USER",
    };
    return axios.post(USER_ENDPOINTS.REGISTER, payload);
}

// -------------------- LOGIN --------------------
export function login(formData) {
    // Include role in payload for backend to validate
    const payload = {
        email: formData.email,
        password: formData.password,
        role: formData.role === "admin" ? "ADMIN" : "USER",
    };
    return axios.post(USER_ENDPOINTS.LOGIN, payload);
}