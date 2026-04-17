"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produce_controller_1 = require("./produce.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const produce_validation_1 = require("./produce.validation");
const router = (0, express_1.Router)();
//  Public
router.get('/', produce_controller_1.produceController.getMarketplace);
router.get('/:id', produce_controller_1.produceController.getProduceById);
//Vendor routes
router.get('/my/listings', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), produce_controller_1.produceController.getMyProduce);
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), (0, validate_middleware_1.validate)(produce_validation_1.createProduceSchema), produce_controller_1.produceController.createProduce);
router.patch('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), (0, validate_middleware_1.validate)(produce_validation_1.updateProduceSchema), produce_controller_1.produceController.updateProduce);
router.delete('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), produce_controller_1.produceController.deleteProduce);
// Admin routes
router.patch('/:id/certification', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'), produce_controller_1.produceController.updateCertificationStatus);
exports.default = router;
//# sourceMappingURL=produce.routes.js.map