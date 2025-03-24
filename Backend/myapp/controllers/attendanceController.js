import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const markAttendance = asyncHandler(async (req, res) => {
    try {
        const { records } = req.body; 

        if (!Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ message: "Invalid attendance data" });
        }

        for (let record of records) {
            const employee = await Employee.findOne({ employeeId: record.empId });
            if (!employee) {
                return res.status(404).json({ message: `Employee ID ${record.empId} not found` });
            }
            record.employeeId = employee._id;
        }

        await Promise.all(
            records.map(async (record) => {
                await Attendance.findOneAndUpdate(
                    { employeeId: record.employeeId, date: record.date },
                    { status: record.status },
                    { upsert: true, new: true }
                );
            })
        );

        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export const getAttendanceReport = asyncHandler(async (req, res) => {
  try {
    const { month, page = 1, limit = 10 } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const startDate = new Date(`${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalRecords = await Attendance.countDocuments({
      date: { $gte: startDate, $lt: endDate },
    });

    const attendanceRecords = await Attendance.find({
        date: { $gte: startDate, $lt: endDate },
      })
        .populate({
          path: "employeeId",
          select: "employeeId userId department",
          populate: {
            path: "department",
            select: "name", 
          },
        })
        .skip((page - 1) * limit)
        .limit(Number(limit));
      

   
    res.status(200).json({
      records: attendanceRecords,
      totalPages: Math.ceil(totalRecords / limit),
    });

  } catch (error) {
    console.error("Error fetching attendance report:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export const getAttendanceByDate = asyncHandler(async (req, res) => {
    try {
        const { date } = req.params;
        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        const attendanceRecords = await Attendance.find({ date })
            .populate("employeeId", "employeeId userId")
            .populate("employeeId.userId", "name email");

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this date" });
        }

        res.status(200).json({ message: "Attendance fetched successfully", attendanceRecords });
    } catch (error) {
        console.error("Error fetching attendance by date:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export const getAttendanceByEmployee = asyncHandler(async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const attendanceRecords = await Attendance.find({ employeeId: employee._id });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: "No attendance records found for this employee" });
        }

        res.status(200).json({ message: "Attendance fetched successfully", attendanceRecords });
    } catch (error) {
        console.error("Error fetching attendance by employee:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export const updateAttendance = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Present", "Absent", "Sick", "Leave"].includes(status)) {
            return res.status(400).json({ message: "Invalid attendance status" });
        }

        const attendance = await Attendance.findByIdAndUpdate(id, { status }, { new: true });

        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.status(200).json({ message: "Attendance updated successfully", attendance });
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
});
