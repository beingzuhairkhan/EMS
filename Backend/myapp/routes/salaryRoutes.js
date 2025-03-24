import express from 'express';
import { verifyJWT } from '../middlewares/authMiddleware.js'
import {restrict} from '../middlewares/restrictRole.js'
import {
  addSalary,
  getAllSalaries,
  getSalaryByEmployeeId,
  updateSalary,
  deleteSalary,
} from '../controllers/salaryController.js';

const router = express.Router();

router.post("/:employeeId", verifyJWT, restrict, addSalary);
router.get("/", verifyJWT, restrict, getAllSalaries);
router.get("/:employeeId", verifyJWT, getSalaryByEmployeeId);
router.put("/:salaryId", verifyJWT, restrict, updateSalary);
router.delete("/:salaryId", verifyJWT, restrict, deleteSalary);

export default router;
