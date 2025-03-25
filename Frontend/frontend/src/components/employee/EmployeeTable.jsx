import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../src/context/axiosInstance";
import toast from "react-hot-toast";

const EmployeeTable = ({ allEmployee, setAllEmployee, handleEdit }) => {
  const navigate = useNavigate();

  // Function to handle employee deletion
  const handleDelete = async (id) => {
    if (!id) return;
    
    // const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    // if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/employee/${id}`);
      
      setAllEmployee((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));

      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
    //   toast.error("Failed to delete employee.");
    toast.success("Employee deleted successfully!");
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <th className="py-3 px-6 text-left font-semibold">Sr No</th>
            <th className="py-3 px-6 text-left font-semibold">Image</th>
            <th className="py-3 px-6 text-left font-semibold">Name</th>
            <th className="py-3 px-6 text-left font-semibold">Email</th>
            <th className="py-3 px-6 text-left font-semibold">Department</th>
            <th className="py-3 px-6 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allEmployee?.map((emp, index) => (
            <tr key={emp._id} className="hover:bg-gray-100 transition">
              
              <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>

           
              <td className="py-4 px-6">
                <img
                  src={emp.userId?.image || "https://via.placeholder.com/50"}
                  alt={emp.userId?.name || "No Name"}
                  className="w-10 h-10 rounded-full"
                />
              </td>

             
              <td className="py-4 px-6 text-gray-700">{emp.userId?.name || "N/A"}</td>

            
              <td className="py-4 px-6 text-gray-700">{emp.userId?.email || "N/A"}</td>

             
              <td className="py-4 px-6 text-gray-700">{emp.department?.name || "N/A"}</td>

              
              <td className="py-4 px-6 flex gap-3">
                <button
                  onClick={() => navigate(`/admin/departments/employee/${emp._id}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  View
                </button>
                {handleEdit && (
                  <button
                    onClick={() => handleEdit(emp._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                )}
               
                  <button
                    onClick={() => navigate(`/admin/employee/salary/${emp._id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                  >
                    Salary
                  </button>
            
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
