import { Router } from 'express';
import CountryController from '../controllers/CountryController';
const router = Router();
const countryController = new CountryController();

router.post('/country',countryController.create.bind(countryController));
router.post('/countryAttributes',countryController.createAttributes.bind(countryController));
router.get('/country',countryController.list.bind(countryController));
// const authController = new AuthController(); // Create an instance of AuthController

// router.post('/auth/register', authController.signUp.bind(authController));
// router.post('/auth/login', authController.login.bind(authController));
// router.post('/auth/verify-otp', authController.verifyOtp.bind(authController))

export default router;
