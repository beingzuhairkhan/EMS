
import EmployeeSidebar from '../Dashboard/EmployeeSidebar'
import LeaveSummary from './LeaveSummary'
const Leave = () => {


  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 fixed h-full bg-gray-900 shadow-lg">
        <EmployeeSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 ml-64 p-8 mt-28">
      {/* <MyProfileSummary/> */}
      <LeaveSummary/>

      
      </div>
    </div>
  );
};

export default Leave;
