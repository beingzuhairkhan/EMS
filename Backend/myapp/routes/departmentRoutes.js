import express from 'express';
import {
  addDepartment,
  getAllDepartments,
  editDepartmentById,
  deleteDepartmentById,
  searchFun
} from '../controllers/departmentController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';
import {restrict} from '../middlewares/restrictRole.js'
const router = express.Router();

router.post('/add', verifyJWT, restrict ,  addDepartment);
router.get('/all', verifyJWT ,  getAllDepartments);
router.get('/search', verifyJWT,restrict ,  searchFun);
router.put('/edit/:id', verifyJWT, restrict ,  editDepartmentById);
router.delete('/delete/:id', verifyJWT, restrict ,  deleteDepartmentById);

export default router;
