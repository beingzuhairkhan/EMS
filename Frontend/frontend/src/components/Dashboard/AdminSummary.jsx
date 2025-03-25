import { useEffect, useState } from "react";
import axiosInstance from "../../../src/context/axiosInstance";
import { PiCircleNotch } from "react-icons/pi";
const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axiosInstance.get("admin/dashboard");
        console.log("summary", response);
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) return (
    <div className="flex justify-center items-center mt-40">
      <span className="animate-spin font-semibold">
        <PiCircleNotch color="black" size={40} />
      </span>
      <p className="ml-2 text-lg font-medium">Loading...</p>
    </div>
  );
  

  return (
    <div className="p-6 overflow-y-auto">
    
      <center>
        <h1 className="text-2xl font-bold mb-6 font-sans text-black">Dashboard Overview</h1>
      </center>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: "Total Employees", value: summary?.totalEmployees },
          { title: "Total Departments", value: summary?.totalDepartments },
          { title: "Monthly Payroll", value: `₹${summary?.totalSalary}` },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105 hover:brightness-125"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

    
      <center>
        <h1 className="text-2xl font-bold mt-4 mb-6 font-sans text-black">Leave Details</h1>
      </center>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { title: "Leave Applied", value: summary?.leaveSummary.appliedFor },
          { title: "Leave Approved", value: summary?.leaveSummary.approved },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105 hover:brightness-125"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Leave Pending", value: summary?.leaveSummary.pending },
          { title: "Leave Rejected", value: summary?.leaveSummary.rejected },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-2xl shadow-md text-center transition-transform transform hover:scale-105 hover:brightness-125"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSummary;
