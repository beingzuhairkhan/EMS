import { useState, useEffect } from "react";
import axiosInstance from "../../../src/context/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AttendanceTable = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Dynamic Date
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Fetch employees & restore saved attendance
  useEffect(() => {
    fetchEmployees();
    loadAttendance();
  }, []);

  // ✅ Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/employee/getAllEmployees");
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Error fetching employee data.");
    }
  };

  // ✅ Restore saved attendance from Local Storage
  const loadAttendance = () => {
    const savedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
    if (savedData.date === date) {
      setAttendance(savedData.attendance);
      setSubmitted(savedData.submitted);
    }
  };

  // ✅ Handle attendance selection
  const handleAttendanceChange = (empId, status) => {
    if (!submitted) {
      setAttendance((prev) => {
        const updatedAttendance = { ...prev, [empId]: status };
        saveAttendance(updatedAttendance);
        return updatedAttendance;
      });
    }
  };

  // ✅ Save attendance to Local Storage
  const saveAttendance = (attendanceData) => {
    localStorage.setItem(
      "attendanceData",
      JSON.stringify({ date, attendance: attendanceData, submitted })
    );
  };

  // ✅ Submit Attendance
  const submitAttendance = async () => {
    try {
      const payload = employees.map((emp) => ({
        empId: emp.employeeId,
        date,
        status: attendance[emp.employeeId] || "Absent",
      }));

      await axiosInstance.post("/attendance/mark", { records: payload });
      toast.success("Attendance marked successfully!");

      setSubmitted(true);
      saveAttendance(attendance); // ✅ Save state after submission
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance.");
    }
  };

  // ✅ Filter employees by Employee ID search
  const filteredEmployees = employees.filter((emp) =>
    emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 rounded-lg ">
      {/* 🔹 Top Row - Mark Attendance with Date */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Mark Attendance</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          disabled={submitted}
        />
      </div>

      {/* 🔹 Second Row - Search & Attendance Report Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3"
          disabled={submitted}
        />
        <Link to="/admin/attendance-report">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
            Attendance Report
          </button>
        </Link>
      </div>

      {/* 🔹 Third Row - Attendance Table */}
      <div className="overflow-x-auto rounded-t-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border">Sr No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Emp ID</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp._id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{emp.userId?.name}</td>
                <td className="py-2 px-4 border">{emp.employeeId}</td>
                <td className="py-2 px-4 border">{emp.department?.name}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={attendance[emp.employeeId] || ""}
                    onChange={(e) => handleAttendanceChange(emp.employeeId, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                    disabled={submitted}
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Sick">Sick</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Submit Attendance Button */}
      <div className="mt-6 text-right">
        <button
          onClick={submitAttendance}
          className={`px-6 py-2 rounded-lg shadow-md text-white ${
            submitted ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={submitted}
        >
          {submitted ? "Attendance Marked" : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
