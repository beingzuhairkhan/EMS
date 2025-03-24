import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../src/context/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
const SalaryById = () => {
  const [salaries, setSalaries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const fetchSalaries = async () => {
    try {
      const response = await axiosInstance.get(`/salary/${id}`);
      console.log("response", response);
      if (Array.isArray(response.data.salary)) {
        setSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Error fetching salaries:", error);
      toast.error("Error fetching salary details");
    }
  };

  return (
    <div className="p-6 bg-white  rounded-lg mt-20">
      <div className="flex justify-between" >
        <div>
          <h2 className="text-3xl font-semibold text-gray-800  text-center">
            💰 Salary Details
          </h2>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
          >
            ← Go Back
          </button>
        </div>
      </div>

      {salaries.length === 0 ? (
        <p className="text-gray-500 text-center">No salary records found.</p>
      ) : (
        <div className="overflow-x-auto mt-8 rounded-lg border border-gray-200 shadow-lg">
          <table className="min-w-full bg-white border-collapse rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th className="py-4 px-6 text-center font-semibold">#</th>
                <th className="py-4 px-6 text-center font-semibold">Employee ID</th>
                <th className="py-4 px-6 text-center font-semibold">Basic Salary</th>
                <th className="py-4 px-6 text-center font-semibold">Allowances</th>
                <th className="py-4 px-6 text-center font-semibold">Deductions</th>
                <th className="py-4 px-6 text-center font-semibold">Total Salary</th>
                <th className="py-4 px-6 text-center font-semibold">Pay Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salaries?.map((salary, index) => (
                <tr
                  key={salary._id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="py-4 px-6 text-center font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {salary?.employeeId?.employeeId || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-center text-blue-600 font-semibold">
                    ₹{salary?.basicSalary?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center text-green-600">
                    ₹{salary?.allowances?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center text-red-500">
                    ₹{salary?.deductions?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-green-700">
                    ₹{salary?.netSalary?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {new Date(salary?.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalaryById;
