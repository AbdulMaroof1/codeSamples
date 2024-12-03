import { Router } from 'express';
import AuthController from '../controllers/AuthController'; // Ensure case sensitivity and spelling
import { validateDto } from '../middlewares/validation.middleware';
import { SignUpDto,LoginDTO } from '../dtos/auth/requestDto';
const router = Router();
const authController = new AuthController(); // Create an instance of AuthController


// Auth Routes

router.post('/register', validateDto(SignUpDto) , authController.signUp.bind(authController));
router.post('/login', validateDto(LoginDTO) ,authController.login.bind(authController));
router.post('/forgot-password',authController.forgotPassword.bind(authController));
router.post('/verify-otp', authController.verifyOtp.bind(authController));
router.post('/change-password', authController.changePassword.bind(authController));


export default router;
    