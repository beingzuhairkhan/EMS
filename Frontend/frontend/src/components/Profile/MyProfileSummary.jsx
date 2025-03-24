import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../src/context/axiosInstance";

const LeaveSummary = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("/department/all");
      if (Array.isArray(response.data.departments)) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Error fetching departments");
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if 'toDate' is after 'fromDate'
    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    try {
      const response = await axiosInstance.post("/leave/apply", formData);
      toast.success(response.data.message || "Leave applied successfully");

      // Reset form
      setFormData({
        department: "",
        fromDate: "",
        toDate: "",
        description: "",
      });
    } catch (error) {
      console.error("Error applying leave:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leave Application</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Dropdown */}
      

        {/* From Date */}
        <div className="flex flex-col flex-1">
          <label className="text-gray-600 font-medium mb-1">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">To Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-600 font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Reason for leave..."
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md text-lg"
        >
          Apply for Leave
        </button>
      </form>
    </div>
  );
};

export default LeaveSummary;
