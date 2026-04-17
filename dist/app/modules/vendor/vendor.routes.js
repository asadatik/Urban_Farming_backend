"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/modules/vendor/vendor.routes.ts
const express_1 = require("express");
const vendor_controller_1 = require("./vendor.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
// Public
router.get('/:id', vendor_controller_1.vendorController.getVendorById);
//  update own profile
router.patch('/me/profile', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), vendor_controller_1.vendorController.updateMyProfile);
// Admin only
router.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), vendor_controller_1.vendorController.getAllVendors);
router.patch('/:id/approve', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), vendor_controller_1.vendorController.approveVendor);
exports.default = router;
//# sourceMappingURL=vendor.routes.js.map