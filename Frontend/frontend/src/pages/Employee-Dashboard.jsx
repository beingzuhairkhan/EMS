import { useAuth } from '../context/authContext';
import EmployeeSidebar from '../components/Dashboard/EmployeeSidebar';
import { FiUser } from "react-icons/fi"; 

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/*  Sidebar */}
      <div className="w-64 fixed h-full bg-gray-900 shadow-lg">
        <EmployeeSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 ml-64 p-8 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
          <FiUser className="text-blue-600 text-5xl" /> 
          Welcome, <span className="text-blue-600">{user?.name}!</span>
        </h1>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
