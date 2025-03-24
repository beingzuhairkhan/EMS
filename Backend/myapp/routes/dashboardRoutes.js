import express from 'express';
import {dashboard} from '../controllers/dashboardController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js';
import {restrict} from '../middlewares/restrictRole.js'
const router = express.Router();

router.get('/', verifyJWT, restrict, dashboard);

export default router ;