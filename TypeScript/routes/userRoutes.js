import { Router } from 'express';
import AuthController from '../controllers/AuthController'; // Ensure case sensitivity and spelling
import { validateDto } from '../middlewares/validation.middleware';
import { SignUpDto,LoginDTO } from '../dtos/auth/requestDto';
import { jwtService } from '../utils/jwtService';
import jwtMiddleWare from '../middlewares/jwtMiddleware';
const router = Router();
const authController = new AuthController(); // Create an instance of AuthController


// User Profile Routes

router.put('/profile',jwtMiddleWare.auth,  authController.signUp.bind(authController));
router.put('/change-password',jwtMiddleWare.auth,authController.signUp.bind(authController));



export default router;
    