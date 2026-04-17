"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
// Customer
router.post('/', (0, role_middleware_1.authorise)('CUSTOMER'), order_controller_1.orderController.placeOrder);
router.get('/my', (0, role_middleware_1.authorise)('CUSTOMER'), order_controller_1.orderController.getMyOrders);
router.patch('/:id/cancel', (0, role_middleware_1.authorise)('CUSTOMER'), order_controller_1.orderController.cancelOrder);
// Customer or Admin
router.get('/:id', (0, role_middleware_1.authorise)('CUSTOMER', 'ADMIN'), order_controller_1.orderController.getOrderById);
// Admin / Vendor
router.patch('/:id/status', (0, role_middleware_1.authorise)('ADMIN', 'VENDOR'), order_controller_1.orderController.updateOrderStatus);
// Admin
router.get('/', (0, role_middleware_1.authorise)('ADMIN'), order_controller_1.orderController.getAllOrders);
exports.default = router;
//# sourceMappingURL=order.routes.js.map