"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tracking_controller_1 = require("./tracking.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
// customer
router.post('/', (0, role_middleware_1.authorise)('CUSTOMER'), tracking_controller_1.trackingController.startTracking);
router.get('/my', (0, role_middleware_1.authorise)('CUSTOMER'), tracking_controller_1.trackingController.getMyTrackings);
router.get('/:id', (0, role_middleware_1.authorise)('CUSTOMER', 'ADMIN'), tracking_controller_1.trackingController.getTrackingById);
// real-time status update — core feature
router.patch('/:id/status', (0, role_middleware_1.authorise)('CUSTOMER'), tracking_controller_1.trackingController.updateTrackingStatus);
router.delete('/:id', (0, role_middleware_1.authorise)('CUSTOMER'), tracking_controller_1.trackingController.deleteTracking);
// admin
router.get('/', (0, role_middleware_1.authorise)('ADMIN'), tracking_controller_1.trackingController.getAllTrackings);
exports.default = router;
//# sourceMappingURL=tracking.routes.js.map