"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const rateLimit_middleware_1 = require("../../middlewares/rateLimit.middleware");
const auth_validation_1 = require("./auth.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/signup', rateLimit_middleware_1.authLimiter, (0, validate_middleware_1.validate)(auth_validation_1.signupSchema), auth_controller_1.authController.signup);
router.post('/login', rateLimit_middleware_1.authLimiter, (0, validate_middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.authController.login);
router.get('/me', auth_middleware_1.authenticate, auth_controller_1.authController.getMe);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map