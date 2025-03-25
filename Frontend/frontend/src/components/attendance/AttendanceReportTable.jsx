import { useState, useEffect } from "react";
import axiosInstance from "../../../src/context/axiosInstance";
import toast from "react-hot-toast";

const AttendanceReportTable = () => {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchAttendanceRecords(1, true);
  }, [month]);

  const fetchAttendanceRecords = async (pageNumber, reset = false) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/attendance/report`, {
        params: { month, page: pageNumber, limit: 10 }, 
      });
      console.log("Resport" , response)

      if (reset) {
        setAttendanceRecords(response.data.records);
      } else {
        setAttendanceRecords((prev) => [...prev, ...response.data.records]);
      }

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      toast.error("Error fetching attendance records.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load More Records
  const loadMore = () => {
    if (page < totalPages) {
      fetchAttendanceRecords(page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white ">
   
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Attendance Report</h2>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

    
      <div className="overflow-x-auto rounded-t-xl">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 border">Sr No</th>
              <th className="py-2 px-4 border">Employee ID</th>
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <tr key={record._id} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{record.employeeId?.employeeId}</td>
                  <td className="py-2 px-4 border">{record.employeeId?.employeeId}</td>
                  <td className="py-2 px-4 border">{record.employeeId?.department?.name}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${
                      record.status === "Present"
                        ? "text-green-600"
                        : record.status === "Absent"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No attendance records found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

   
      {attendanceRecords.length > 0 && page < totalPages && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceReportTable;
