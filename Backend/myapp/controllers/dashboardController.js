import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import Department from "../models/departmentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Leave from "../models/leaveModel.js";

export const dashboard = asyncHandler(async (req, res) => {
  try {
    // 🔹 Count Employees & Departments
    const totalEmployees = await Employee.countDocuments({});
    const totalDepartments = await Department.countDocuments({});

   
    const totalSalaryData = await Employee.aggregate([
      { 
          $match: { salary: { $ne: null } } // ✅ Ignore null values
      },
      {
          $addFields: {
              salaryNumeric: { $toDouble: "$salary" } // ✅ Convert salary to number
          }
      },
      { 
          $group: { 
              _id: null, 
              totalSalary: { $sum: "$salaryNumeric" } // ✅ Sum the converted salary
          } 
      }
  ]);
 
  
    const totalSalary = totalSalaryData.length ? totalSalaryData[0].totalSalary : 0;

    // 🔹 Employees who applied for leave
    const employeeApplyLeaves = await Leave.distinct("employeeId");

    // 🔹 Leave status summary
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$Status", // ✅ Corrected grouping field
          count: { $sum: 1 },
        },
      },
    ]);

    // 🔹 Map leave summary correctly
    const leaveSummary = {
      appliedFor: employeeApplyLeaves.length,
      pending: leaveStatus.find((s) => s._id === "Pending")?.count || 0,
      approved: leaveStatus.find((s) => s._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((s) => s._id === "Rejected")?.count || 0,
    };

    // 🔹 Send Response

    
    res.status(200).json({
      totalEmployees,
      totalDepartments,
      totalSalary,
      leaveSummary,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
