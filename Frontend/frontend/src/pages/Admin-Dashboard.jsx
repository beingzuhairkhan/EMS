import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import AdminSummary from '../components/Dashboard/AdminSummary';

const AdminDashBoard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-gray-900">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user?.name}!</h1>
        <AdminSummary />
      </div>
    </div>
  );
};

export default AdminDashBoard;
