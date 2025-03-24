import Employee from "../models/employeeModel.js";
import Department from "../models/departmentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Leave from "../models/leaveModel.js";

export const dashboard = asyncHandler(async (req, res) => {
  try {
  
    const totalEmployees = await Employee.countDocuments({});
    const totalDepartments = await Department.countDocuments({});

   
    const totalSalaryData = await Employee.aggregate([
      { 
          $match: { salary: { $ne: null } } 
      },
      {
          $addFields: {
              salaryNumeric: { $toDouble: "$salary" } 
          }
      },
      { 
          $group: { 
              _id: null, 
              totalSalary: { $sum: "$salaryNumeric" } 
          } 
      }
  ]);
 
  
    const totalSalary = totalSalaryData.length ? totalSalaryData[0].totalSalary : 0;

  
    const employeeApplyLeaves = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$Status", 
          count: { $sum: 1 },
        },
      },
    ]);

    
    const leaveSummary = {
      appliedFor: employeeApplyLeaves.length,
      pending: leaveStatus.find((s) => s._id === "Pending")?.count || 0,
      approved: leaveStatus.find((s) => s._id === "Approved")?.count || 0,
      rejected: leaveStatus.find((s) => s._id === "Rejected")?.count || 0,
    };


    
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
