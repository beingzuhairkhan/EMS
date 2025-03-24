import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; // ✅ Import Auth Context

const RoleBaseRoute = ({ requiredRole }) => {
  const { user } = useAuth(); // ✅ Get user data

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect if the role is unauthorized
  }

  return <Outlet />;
};

export default RoleBaseRoute;
