import AdminSidebar from '../Dashboard/AdminSidebar';
import DepartmentSummary from '../departments/DepartmentSummary';

const Department = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <center>
          <h1 className="text-3xl font-bold text-gray-800 mt-16 mb-4">Departments List</h1>
        </center>
        <DepartmentSummary />
      </div>
    </div>
  );
};

export default Department;
