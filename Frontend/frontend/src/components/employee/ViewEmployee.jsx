import axiosInstance from '../../../src/context/axiosInstance';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axiosInstance.get(`/employee/${id}`);
                console.log("emp" , response)
                setEmployee(response.data.employee);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch employee details");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading employee details...</p>;
    if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-28 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Employee Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Employee Image */}
                <div className="flex justify-center items-center">
                    <img 
                        src={employee?.userId.image || "https://via.placeholder.com/150"} 
                        alt={employee?.userId.name} 
                        className="w-40 h-40 object-cover rounded-lg border-4 border-gray-300 shadow-md"
                    />
                </div>

                {/* Right Side: Employee Details */}
                <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Name:</span> {employee?.userId.name}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Email:</span> {employee?.userId.email}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Role:</span> {employee?.userId.role}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Employee ID:</span> {employee?.employeeId}</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Date of Birth:</span> {new Date(employee?.dob).toDateString()}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Gender:</span> {employee?.gender}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Marital Status:</span> {employee?.maritalStatus}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Designation:</span> {employee?.designation}</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Department:</span> {employee?.department?.name || "Not Assigned"}</p>
                            <p className="text-lg font-medium text-gray-700"><span className="font-semibold">Salary:</span> ₹{employee?.salary.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-center">
                <button 
                    onClick={() => navigate(-1)} 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
                >
                    ← Go Back
                </button>
            </div>
        </div>
    );
};

export default ViewEmployee;
