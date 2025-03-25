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

router.post("/mark", verifyJWT, restrict , markAttendance); 
router.get("/report", verifyJWT, restrict, getAttendanceReport);
router.get("/date/:date", verifyJWT, restrict , getAttendanceByDate); 
router.get("/employee/:employeeId", verifyJWT, restrict , getAttendanceByEmployee); 
router.put("/update/:id", verifyJWT,restrict , updateAttendance); 

export default router;
