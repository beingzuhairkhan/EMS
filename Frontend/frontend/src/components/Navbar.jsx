import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, logOut } = useAuth(); // ✅ Use logOut function


  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      {/* ✅ Left Side - Project Name */}
      <Link to="/" className="text-2xl font-bold">
        <h1 className="text-2xl font-bold tracking-wide text-white">WorkSync Pro</h1>
      </Link>

      {/* ✅ Center - Welcome Message (Only if logged in) */}
      {user && (
        <h1 className="text-lg font-semibold">
          Welcome, <span className="text-blue-300">{user.name}</span>
        </h1>
      )}

      {/* ✅ Right Side - Conditional Buttons */}
      <div className="flex items-center gap-4">
        {!user ? (
          // ✅ If user is NOT logged in, show Sign Up & Login buttons
          <>
            <Link
              to="/register"
              className="bg-gray-900 px-4 py-2 rounded-md text-white hover:bg-gray-900 transition shadow-md"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white px-4 py-2 rounded-md text-black hover:bg-gray-100 transition shadow-md"
            >
              Login
            </Link>
          </>
        ) : (
          // ✅ If user is logged in, show Logout button
          <>
            {
              user.role === "admin" ? (
                <Link
                  to="/admin-dashboard"
                  className="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-800 transition shadow-md"
                >
                  Admin Dashboard
                </Link>
              ) :(
                <Link
                to="/employee-dashboard"
                className="bg-white px-4 py-2 rounded-md text-black hover:bg-gray-100 transition shadow-md"
              >
                User Dashboard
              </Link>
              )
            }
           


            <button
              onClick={logOut}
              className="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-800 transition shadow-md"
            >
              Logout
            </button>
          </>


        )}
      </div>
    </nav>
  );
};

export default Navbar;
