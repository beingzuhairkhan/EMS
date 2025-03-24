import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBriefcase, FiCalendar, FiDollarSign, FiLogOut, FiMenu } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../context/authContext"; // ✅ Import useAuth

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logOut } = useAuth(); // ✅ Get logOut function from context

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 mt-10 bg-black text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white p-5 shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

        <nav className="space-y-4 text-lg mt-8">
          {[
            { to: "/admin-dashboard", icon: FiHome, label: "Dashboard" },
            { to: "/admin/employees", icon: FiUsers, label: "Employees" },
            { to: "/admin/departments", icon: FiBriefcase, label: "Departments" },
            { to: "/admin/leaves", icon: FiCalendar, label: "Leaves" },
            { to: "/admin/salary", icon: FiDollarSign, label: "Salary" },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition ${
                  isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`
              }
            >
              <Icon className="mr-3 text-xl" />
              {label}
            </NavLink>
          ))}

          {/* ✅ Logout Button */}
          <button
            onClick={logOut} // ✅ Logout when clicked
            className="flex items-center px-4 py-2 w-full rounded-md transition cursor-pointer bg-black hover:bg-white hover:text-black mt-4"
          >
            <FiLogOut className="mr-3 text-xl" />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
