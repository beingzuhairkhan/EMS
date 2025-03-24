import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../src/context/authContext"; // ✅ Import Auth Context
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import AdminDashboard from "../src/pages/Admin-Dashboard";
import EmployeeDashboard from "../src/pages/Employee-Dashboard";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import RoleBaseRoute from "../src/utils/RoleBaseRoute";
import Navbar from '../src/components/Navbar';
import Department from '../src/components/departments/Department';
import Employee from '../src/components/employee/Employee';
import ViewEmployee from '../src/components/employee/ViewEmployee';
import Salary from '../src/components/salary/salary';
import SalaryById from '../src/components/salary/SalaryById';
import Profile from '../src/components/Profile/MyProfile';
import Leave from '../src/components/leave/Leave';
import Password from '../src/components/password/Password';
import AdminLeave from '../src/components/adminLeave/Leave';
import Hero from '../src/components/Hero';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Admin Protected Routes */}
        <Route element={<RoleBaseRoute requiredRole={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<Employee />} />
          <Route path="/admin/departments" element={<Department />} />
          <Route path="/admin/leaves" element={<AdminLeave />} />
          <Route path="/admin/departments/employee/:id" element={<ViewEmployee />} />
          <Route path="/admin/salary" element={<Salary />} />
          <Route path="/admin/employee/salary/:id" element={<SalaryById />} />
        </Route>

        {/* ✅ Employee Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile/:id" element={<Profile />} />
          <Route path="/employee/leaves" element={<Leave />} />
          <Route path="/employee/salary/:id" element={<SalaryById />} />
          <Route path="/employee/change-password" element={<Password />} />
        </Route>

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </>
  );
}

export default App;
