import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axiosInstance from '../../../src/context/axiosInstance';
import EmployeeTable from './EmployeeTable';

const AddEmployee = () => {
    const [showForm, setShowForm] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [allEmployee, setAllEmployee] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        employeeId: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        designation: "",
        department: "",
        salary: "",
        password: "",
        role: "",
        image: null,
    });

    useEffect(() => {
        fetchDepartments();
        fetchAllEmployees();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredData([...allEmployee, ...departments]);
            return;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();

        const filteredEmployees = allEmployee.filter(emp =>
            emp?.userId?.name?.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredDepartments = departments.filter(dept =>
            dept.name.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredData([...filteredEmployees, ...filteredDepartments]);
    }, [searchQuery, departments, allEmployee]);


    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get("department/all");
            if (Array.isArray(response.data.departments)) {
                setDepartments(response.data.departments);
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchAllEmployees = async () => {
        try {
            const response = await axiosInstance.get("employee/getAllEmployees");
            if (Array.isArray(response.data.employees)) {
                setAllEmployee(response.data.employees);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const newFormData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "image" && formData.image) {
                    newFormData.append("image", formData.image); // ✅ Append Image
                } else {
                    newFormData.append(key, formData[key]);
                }
            });
    
            if (editId) {
                await axiosInstance.patch(`employee/${editId}`, newFormData, {
                    headers: { "Content-Type": "multipart/form-data" }, // ✅ Ensure multipart/form-data
                });
                toast.success("Employee updated successfully");
            } else {
                await axiosInstance.post("employee/addEmployee", newFormData, {
                    headers: { "Content-Type": "multipart/form-data" }, // ✅ Correct Header
                });
                toast.success("Employee added successfully");
            }
    
            fetchAllEmployees();
            setShowForm(false);
            setEditId(null);
            setFormData({
                name: "",
                email: "",
                employeeId: "",
                dob: "",
                gender: "",
                maritalStatus: "",
                designation: "",
                department: "",
                salary: "",
                password: "",
                role: "",
                image: null,
            });
        } catch (error) {
            console.error("Error submitting employee:", error);
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    };
    
    const handleEdit = (id) => {
        const employee = allEmployee.find(emp => emp._id === id);
        if (!employee) return;
        setEditId(id);
        setFormData({
            name: employee.userId?.name || "",
            email: employee.userId?.email || "",
            employeeId: employee.employeeId || "",
            dob: employee.dob || "",
            gender: employee.gender || "",
            maritalStatus: employee.maritalStatus || "",
            designation: employee.designation || "",
            department: employee.department?._id || "",
            salary: employee.salary || "",
            password: "",
            role: employee.userId?.role || "",
            image: null,
        });
        setShowForm(true);
    };

    return (
        <div>
            {/* Search & Add Button */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search employee or department..."
                    className="p-2 border border-gray-300 rounded-lg w-1/3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    {editId ? "Edit Employee" : "+ Add Employee"}
                </button>
            </div>

            {/* Add Employee Form */}
            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="p-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        <input type="email" placeholder="Email" className="p-2 border rounded-lg" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        <input type="text" placeholder="Employee ID" className="p-2 border rounded-lg" value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} required />
                        <input type="date" placeholder="Date of Birth" className="p-2 border rounded-lg" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} required />
                        <select className="p-2 border rounded-lg" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <select className="p-2 border rounded-lg" value={formData.maritalStatus} onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })} required>
                            <option value="">Marital Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                        <input type="text" placeholder="Designation" className="p-2 border rounded-lg" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required />
                        <input type="password" placeholder="Password" className="p-2 border rounded-lg" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        <select className="p-2 border rounded-lg" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Employee</option>
                        </select>
                        <select className="p-2 border rounded-lg" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required>
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                // <option key={dept._id} value={dept._id}>{dept.name}</option>
                                <option key={dept._id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>

                        <input type="number" placeholder="Salary" className="p-2 border rounded-lg" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required />
                        <input type="file" className="p-2 border rounded-lg" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} required />
                        <button type="submit" className="col-span-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
                            {editId ? "Update Employee" : "Create Employee"}
                        </button>
                    </form>
                </div>
            )}

            {/* Employee Table */}
            <EmployeeTable allEmployee={filteredData } handleEdit={handleEdit} />
        </div>
    );
};

export default AddEmployee;
