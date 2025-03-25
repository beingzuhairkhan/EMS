import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../src/context/axiosInstance";
import { useAuth } from "../../../src/context/authContext";

const LeaveSummary = () => {
  const { user } = useAuth(); 
  const [leaves, setLeaves] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);


  const fetchLeaves = async () => {
    if (!user?._id) {
        console.error("User ID is undefined. Cannot fetch leaves.");
        toast.error("Error: User ID is missing.");
        return;
    }

    try {
        console.log("Fetching leaves for user ID:", user._id); 
        const response = await axiosInstance.get(`/leave/${user._id}`);
        setLeaves(response.data.leaves || []);
    } catch (error) {
        console.error("Error fetching leaves:", error);
        toast.error("Error fetching leave records.");
    }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    if (!formData.leaveType || !formData.fromDate || !formData.toDate || !formData.description) {
      toast.error("All fields are required.");
      return;
    }

    const leaveData = {
      employeeId: user?._id,
      leaveType: formData.leaveType,
      startDate: formData.fromDate,
      endDate: formData.toDate,
      leaveReason: formData.description,
      status: "Pending",
    };

    try {
      const response = await axiosInstance.post("/leave/apply", leaveData);
      toast.success(response.data.message || "Leave applied successfully");

   
      fetchLeaves();

     
      setFormData({ leaveType: "", fromDate: "", toDate: "", description: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error applying leave:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto   rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leave Summary</h2>

      
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
      >
        + Add New Leave
      </button>

    
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="py-3 px-4 text-left font-semibold">Sr No</th>
              <th className="py-3 px-4 text-left font-semibold">Leave Type</th>
              <th className="py-3 px-4 text-left font-semibold">From</th>
              <th className="py-3 px-4 text-left font-semibold">To</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={leave._id} className="hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{leave.leaveType}</td>
                  <td className="py-3 px-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{leave.leaveReason}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      leave.Status === "Approved"
                        ? "text-green-600"
                        : leave.Status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {leave.Status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
             
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
              </div>

              
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

             
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

          
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Reason for leave..."
                  value={formData.description}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>

           
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Submit
                </button>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveSummary;
