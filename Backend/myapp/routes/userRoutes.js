
import express from 'express';
import { registerUser , loginUser , verify , logoutUser , changeCurrentPassword} from '../controllers/userController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/register', registerUser );
router.post('/login', loginUser );
router.get('/verify', verifyJWT , verify);
router.post('/logout', verifyJWT, logoutUser );
router.post('/changePassword', verifyJWT, changeCurrentPassword );




export default router;

