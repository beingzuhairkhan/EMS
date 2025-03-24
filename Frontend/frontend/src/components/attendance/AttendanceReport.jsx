import AdminSidebar from '../Dashboard/AdminSidebar';
import AttendanceReportTable from './AttendanceReportTable'

const AttendanceReport = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <center>
          <h1 className="text-3xl font-bold text-gray-800 mt-16 mb-4">Attendance Report</h1>
        </center>
        <AttendanceReportTable />
      </div>
    </div>
  );
};

export default AttendanceReport;
