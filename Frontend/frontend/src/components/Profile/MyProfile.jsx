
import EmployeeSidebar from '../Dashboard/EmployeeSidebar'
import MyProfileSummary from './MyProfileSummary'
import ViewEmployee from '../employee/ViewEmployee'
const MyProfile = () => {


  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 fixed h-full bg-gray-900 shadow-lg">
        <EmployeeSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
      {/* <MyProfileSummary/> */}
      <ViewEmployee/>

      
      </div>
    </div>
  );
};

export default MyProfile;
