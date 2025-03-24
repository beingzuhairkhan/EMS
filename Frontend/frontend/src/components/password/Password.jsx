
import EmployeeSidebar from '../Dashboard/EmployeeSidebar'
import ChangePassword from './ChangePassword'
const Password = () => {


  return (
    <div className="flex h-screen bg-gray-100">

      <div className="w-64 fixed h-full bg-gray-900 shadow-lg">
        <EmployeeSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 ml-64 p-8">

      <ChangePassword/>

      
      </div>
    </div>
  );
};

export default Password;
