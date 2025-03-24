import express from 'express';
import {applyLeave , getLeaveById , getAllLeaves ,updateLeaveStatus } from '../controllers/leaveController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js';
import {restrict} from '../middlewares/restrictRole.js'

const router = express.Router();

router.post('/apply', verifyJWT , applyLeave);
router.get('/:id', verifyJWT , getLeaveById);
router.get("/", verifyJWT,restrict, getAllLeaves);
router.put("/update/:id", verifyJWT,restrict, updateLeaveStatus);


export default router;
