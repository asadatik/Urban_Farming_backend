
import { Router } from 'express';
import { orderController } from './order.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();


router.use(authenticate);

// Customer
router.post('/', authorise('CUSTOMER'), orderController.placeOrder);
router.get('/my', authorise('CUSTOMER'), orderController.getMyOrders);
router.patch('/:id/cancel', authorise('CUSTOMER'), orderController.cancelOrder);

// Customer or Admin
router.get('/:id', authorise('CUSTOMER', 'ADMIN'), orderController.getOrderById);

// Admin / Vendor
router.patch('/:id/status', authorise('ADMIN', 'VENDOR'), orderController.updateOrderStatus);

// Admin
router.get('/', authorise('ADMIN'), orderController.getAllOrders);

export default router;
