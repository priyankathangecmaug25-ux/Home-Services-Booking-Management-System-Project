
import { Navigate, Outlet } from "react-router-dom";
import { getRole, getUserId } from "../services/RoleService";

export function PrivateRoute({ allowedRoles }) {

  const role = getRole();        // "ADMIN" or "USER"
  const userId = getUserId();    // user id stored at login

  //  If not logged in → go to login page
  if (!role || !userId) {
    return <Navigate to="/login" replace />;
  }

  //  If role not allowed → deny access
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // ✔ Access granted
  return <Outlet />;
}
