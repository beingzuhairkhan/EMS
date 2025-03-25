import { useState, useEffect } from "react";
import LeaveTable from "./LeaveTable";
import axiosInstance from "../../../src/context/axiosInstance";
import toast from "react-hot-toast";

const LeaveSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get("/leave");
      console.log("Leaves Data:", response.data);
      setLeaves(response.data?.leaves || []);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Error fetching leave records.");
    }
  };

  const updateLeaveStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/leave/update/${id}`, { status });
      toast.success(`Leave ${status}`);
      fetchLeaves();
    } catch (error) {
      console.error("Error updating leave:", error);
      toast.error("Failed to update leave status.");
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const employeeName = leave?.employeeId?.employeeId?.toLowerCase() || ""; 
    const matchesSearch = employeeName.includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? leave?.Status?.toLowerCase() === filterStatus.toLowerCase() : true; 
  
    return matchesSearch && matchesStatus;
  });
  

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search & Filter Leaves</h2>
      <div className="flex flex-wrap gap-4 mb-4">
    
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
        />
    
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

     
      <LeaveTable leaves={filteredLeaves} onUpdateStatus={updateLeaveStatus} />
    </div>
  );
};

export default LeaveSearch;
