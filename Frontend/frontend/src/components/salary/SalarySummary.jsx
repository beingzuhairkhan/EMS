import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axiosInstance from '../../../src/context/axiosInstance';

const SalarySummary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
   
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

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

  const fetchEmployeesByDepartment = async (departmentId) => {
    try {
      const response = await axiosInstance.get(`/employee/department/${departmentId}`);
      if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employees");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "department") {
      fetchEmployeesByDepartment(e.target.value);
      setFormData((prev) => ({ ...prev, employee: "" }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/salary/${formData.employee}`, formData);
      toast.success(response.data.message || "Salary details saved successfully");
      setFormData({
        department: "",
        employee: "",
        basicSalary: "",
        allowances: "",
        deductions: "",
        payDate: "",
      });
    } catch (error) {
      console.error("Error saving salary details:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Salary Summary</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
    
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>

       
        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
          disabled={!formData.department}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.userId?.name}</option>
          ))}
        </select>

       
        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />

        
        <input
          type="number"
          name="allowances"
          placeholder="Allowances"
          value={formData.allowances}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
        />

     
        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
        />

        
        <input
          type="date"
          name="payDate"
          value={formData.payDate}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />

       
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Salary Details
        </button>
      </form>
    </div>
  );
};

export default SalarySummary;
