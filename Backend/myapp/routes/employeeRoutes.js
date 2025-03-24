import express from 'express';
import {addEmployee , getAllEmployees , getEmployeeBydId, editEmployeeById , employeeDeleteById , fetchEmployeeByDepId} from '../controllers/employeeController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js';
import {restrict} from '../middlewares/restrictRole.js'
import  upload  from '../middlewares/multerMiddleware.js'

const router = express.Router();


router.post("/addEmployee", verifyJWT, restrict , upload.single("image"), addEmployee);
router.get("/getAllEmployees" , verifyJWT , restrict , getAllEmployees);
router.get("/:id"   , verifyJWT , getEmployeeBydId);
router.patch("/:id" , verifyJWT , restrict ,upload.single("image"), editEmployeeById);
router.delete("/:id" , verifyJWT , restrict , employeeDeleteById);
router.get("/department/:id" , verifyJWT , restrict , fetchEmployeeByDepId)
export default router;