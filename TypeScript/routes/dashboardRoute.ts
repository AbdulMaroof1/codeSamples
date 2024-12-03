import { Router } from 'express';
import DashboardController from '../controllers/DashboardController'; // Ensure case sensitivity and spelling
import jwtMiddleware from '../middlewares/jwtMiddleware';
const router = Router();
const dashboardController = new DashboardController(); // Create an instance of AuthController

router.post('/',jwtMiddleware.auth,dashboardController.dashboard.bind(dashboardController));

export default router;
