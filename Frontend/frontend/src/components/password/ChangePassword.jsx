import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../src/context/axiosInstance";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post("/user/changePassword", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      toast.success(response.data.message || "Password changed successfully!");

      // ✅ Reset form
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Change Password</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Old Password */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md text-lg"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
