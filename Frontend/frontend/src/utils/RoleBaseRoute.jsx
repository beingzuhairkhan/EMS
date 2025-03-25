import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const RoleBaseRoute = ({ requiredRole }) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return <Outlet />;
};

export default RoleBaseRoute;
