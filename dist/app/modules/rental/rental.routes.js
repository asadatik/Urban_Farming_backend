"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rental_controller_1 = require("./rental.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
// Public
router.get('/', rental_controller_1.rentalController.getRentalSpaces);
router.get('/:id', rental_controller_1.rentalController.getRentalById);
// Vendor only
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), rental_controller_1.rentalController.createRentalSpace);
router.patch('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), rental_controller_1.rentalController.updateRentalSpace);
router.delete('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('VENDOR'), rental_controller_1.rentalController.deleteRentalSpace);
exports.default = router;
//# sourceMappingURL=rental.routes.js.map