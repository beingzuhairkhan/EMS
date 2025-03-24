import Leave from '../models/leaveModel.js';
import Employee from '../models/employeeModel.js';
import User from '../models/userModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const applyLeave = asyncHandler(async (req, res) => {
    const { employeeId, startDate, endDate, leaveType, leaveReason } = req.body;

    try {

        if (!employeeId || !startDate || !endDate || !leaveType || !leaveReason) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

    
        const employee = await Employee.findOne({ userId : employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found for this user" });
        }

        if (!["Casual Leave", "Sick Leave", "Annual Leave"].includes(leaveType)) {
            return res.status(400).json({ message: "Invalid leave type" });
        }

        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ message: "Start date must be before end date" });
        }

  
        const existingLeave = await Leave.findOne({
            employeeId: employee._id, // ✅ Use employee `_id`
            leaveType,
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
        });

        if (existingLeave) {
            return res.status(400).json({
                message: "Employee has already applied for leave within this period",
            });
        }

   
        const newLeave = new Leave({
            employeeId: employee._id,
            startDate,
            endDate,
            leaveType,
            leaveReason,
            status: "Pending",
        });

        await newLeave.save();

        res.status(201).json({
            message: "Leave application successful",
            leave: newLeave,
        });

    } catch (error) {
        console.error("Error applying leave:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export const getLeaveById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Find Employee by userId
        const employee = await Employee.findOne({ userId: id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found for this user" });
        }

        // ✅ Find Leaves using employee._id (not _id of Leave)
        const leaves = await Leave.find({ employeeId: employee._id });

        if (!leaves.length) {
            return res.status(404).json({ message: "No leave records found for this employee" });
        }

        res.status(200).json({ message: "Leave fetched successfully", leaves });

    } catch (error) {
        console.error("Error fetching leave:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export const getAllLeaves = asyncHandler(async (req, res) => {
    try {
        const leaves = await Leave.find({})
            .populate({
                path: "employeeId",
                select: "name employeeId department",
                populate: { path: "department", select: "name" }, // ✅ Populate department inside employee
            });

        if (!leaves.length) {
            return res.status(404).json({ message: "No leave records found" });
        }

        res.status(200).json({
            message: "All leave records fetched successfully",
            leaves,
        });

    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export const updateLeaveStatus = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // ✅ Extract from body, not params

        // ✅ Find leave by ID
        const leave = await Leave.findById(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave not found" });
        }

        // ✅ Validate status
        const validStatuses = ["Pending", "Approved", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // ✅ Update leave status
        leave.Status = status;
        await leave.save();

        // ✅ Fetch employee and user if leave is Approved/Rejected
        let user;
        if (status === "Approved" || status === "Rejected") {
            const employee = await Employee.findById(leave.employeeId);
            if (employee) {
                user = await User.findById(employee.userId);
                console.log(`Notification sent to: ${user?.email}`);
            }
        }

        return res.status(200).json({ message: "Leave status updated successfully", leave });

    } catch (error) {
        console.error("Error updating leave status:", error);
        return res.status(500).json({ message: "Server error" });
    }
});