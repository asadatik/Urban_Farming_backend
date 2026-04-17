"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorise)('ADMIN'));
router.get('/', user_controller_1.userController.getAllUsers);
router.get('/:id', user_controller_1.userController.getUserById);
router.patch('/:id/status', user_controller_1.userController.updateUserStatus);
router.delete('/:id', user_controller_1.userController.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map