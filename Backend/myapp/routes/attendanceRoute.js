import express from "express";
import {
    markAttendance,
    getAttendanceByDate,
    getAttendanceByEmployee,
    updateAttendance,
    getAttendanceReport
} from '../controllers/attendanceController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js';
import {restrict} from '../middlewares/restrictRole.js'
const router = express.Router();

router.post("/mark", verifyJWT, restrict , markAttendance); // ✅ Mark Attendance
router.get("/report", verifyJWT, restrict, getAttendanceReport);
router.get("/date/:date", verifyJWT, restrict , getAttendanceByDate); // ✅ Get Attendance by Date
router.get("/employee/:employeeId", verifyJWT, restrict , getAttendanceByEmployee); // ✅ Get Attendance by Employee ID
router.put("/update/:id", verifyJWT,restrict , updateAttendance); // ✅ Update Attendance Status

export default router;
