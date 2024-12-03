import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();
const orderController = new OrderController(); // Create an instance of AuthController

router.post('/',jwtMiddleware.auth,orderController.create.bind(orderController));
router.post('/successCallBack',orderController.successCallBack.bind(orderController));
router.post('/order-utils',jwtMiddleware.auth,orderController.utils.bind(orderController));
// router.post('/createPayment', orderController.login.bind(orderController));

export default router;
