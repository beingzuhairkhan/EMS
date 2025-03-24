import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axiosInstance from '../../../src/context/axiosInstance'
const API_BASE_URL = import.meta.env.VITE_PUBLIC_URL;

const DepartmentSummary = () => {
  const [showForm, setShowForm] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    setFilteredDepartments(
      departments.filter(dept =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, departments]);

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get(`department/all`);
      console.log("response", response);
      if (Array.isArray(response.data.departments)) {
        setDepartments(response.data.departments);
        setFilteredDepartments(response.data.departments);
      } else {
        setDepartments([]);
        setFilteredDepartments([]);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
      setFilteredDepartments([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await axiosInstance.put(`department/edit/${editId}`, {
          name: departmentName,
          description,
        });
        setDepartments(departments.map(dept => dept._id === editId ? response.data.department : dept));
        toast.success("Department updated successfully");
      } else {
        const response = await axiosInstance.post(`department/add`, {
          name: departmentName,
          description,
        });
        setDepartments([...departments, response.data.department]);
        toast.success("Department added successfully");
      }
      setDepartmentName("");
      setDescription("");
      setShowForm(false);
      setEditId(null);
    } catch (error) {
      console.error("Error submitting department:", error);
    }
  };

  const handleEdit = (id) => {
    const dept = departments.find(d => d._id === id);
    if (!dept) return;
    setDepartmentName(dept.name);
    setDescription(dept.description);
    setEditId(dept._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`department/delete/${id}`);
      setDepartments(departments.filter(dept => dept._id !== id));
      toast.success("Department deleted successfully");
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search department..."
          className="p-2 border border-gray-300 rounded-lg w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          {editId ? "Edit Department" : "+ Add Department"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">{editId ? "Edit Department" : "Add New Department"}</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Department Name"
              className="p-2 border border-gray-300 rounded-lg"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="p-2 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
              {editId ? "Update Department" : "Create Department"}
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="py-3 px-6 text-left font-semibold">Sr No</th>
              <th className="py-3 px-6 text-left font-semibold">Department</th>
              <th className="py-3 px-6 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDepartments?.map((dept, index) => (
              <tr key={dept._id} className="hover:bg-gray-100 transition">
                <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
                <td className="py-4 px-6 text-gray-700">{dept?.name}</td>
                <td className="py-4 px-6 flex gap-3">
                  <button onClick={() => handleEdit(dept._id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(dept._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default DepartmentSummary;