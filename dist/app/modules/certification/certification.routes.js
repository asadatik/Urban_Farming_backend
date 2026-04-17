"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/modules/certification/certification.routes.ts
const express_1 = require("express");
const certification_controller_1 = require("./certification.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
// Vendor
router.get('/my', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), certification_controller_1.certificationController.getMyCerts);
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), certification_controller_1.certificationController.submitCert);
// Admin
router.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), certification_controller_1.certificationController.getAllCerts);
router.get('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), certification_controller_1.certificationController.getCertById);
router.patch('/:id/review', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), certification_controller_1.certificationController.reviewCert);
exports.default = router;
//# sourceMappingURL=certification.routes.js.map