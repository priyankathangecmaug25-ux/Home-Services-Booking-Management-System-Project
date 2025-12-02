export const API_PORT = "8080";
export const API_BASE_URL = `http://localhost:${API_PORT}`;

/* ===================== USERS ===================== */
export const USER_ENDPOINTS = {
    REGISTER: `${API_BASE_URL}/users`,        // POST
    LOGIN: `${API_BASE_URL}/users/login`,     // POST
    GET_ALL: `${API_BASE_URL}/users`,         // GET
    GET_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`,
};


export const SERVICE_ENDPOINTS = {
    GET_ALL: `${API_BASE_URL}/services`,
    GET_BY_ID: (id) => `${API_BASE_URL}/services/${id}`,
    GET_BY_CATEGORY: (category) => `${API_BASE_URL}/services/category/${category}`,
    ADD: `${API_BASE_URL}/services`,
    UPDATE: (id) => `${API_BASE_URL}/services/${id}`,
    DELETE: (id) => `${API_BASE_URL}/services/${id}`,
};


export const PAYMENT_ENDPOINTS = {
    CREATE: `${API_BASE_URL}/payments`, 
    GET: (id) => `${API_BASE_URL}/payments/${id}`,
};


/* ===================== FEEDBACK ===================== */
export const FEEDBACK_ENDPOINTS = {
    CREATE: `${API_BASE_URL}/feedback`,
    GET_BY_SERVICE: (serviceId) => `${API_BASE_URL}/feedback/${serviceId}`,
};


/* ===================== BOOKINGS ===================== */
export const BOOKING_ENDPOINTS = {
    ADD: `${API_BASE_URL}/bookings`,
    GET_BY_ID: (id) => `${API_BASE_URL}/bookings/${id}`,
};


/* ===================== ADMIN (only if backend has /api/admin controller) ===================== */
export const ADMIN_ENDPOINTS = {
    GET_HOME_SERVICES: `${API_BASE_URL}/admin/services`,
    GET_PAYMENTS: `${API_BASE_URL}/admin/payments`,
    //GET_USERS: `${API_BASE_URL}/admin/users`,
GET_FEEDBACKS: `${API_BASE_URL}/admin/feedbacks`

};
