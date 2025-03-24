import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; // ✅ Import Auth Context

const ProtectedRoute = () => {
  const { user } = useAuth(); // ✅ Get user authentication status

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
