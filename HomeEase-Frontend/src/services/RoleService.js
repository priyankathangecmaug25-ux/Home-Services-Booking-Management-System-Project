
// Save Role
export function storeRole(role) {
  localStorage.setItem("role", role.toUpperCase());
}

// Save User ID
export function storeUserId(id) {
  localStorage.setItem("userId", id);
}

// Get User ID
export function getUserId() {
  return localStorage.getItem("userId");
}

// Get Role
export function getRole() {
  return localStorage.getItem("role");
}

// Remove Role
export function removeRole() {
  localStorage.removeItem("role");
}

// Remove User ID
export function removeUserId() {
  localStorage.removeItem("userId");
}
