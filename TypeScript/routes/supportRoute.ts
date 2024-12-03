import { Router } from 'express';
import SupportController from '../controllers/SupportController';
const support = new SupportController();
const router = Router();

router.get('/report/:id');

export default router;
