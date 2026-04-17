"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const response_1 = require("../../utils/response");
exports.authController = {
    async signup(req, res, next) {
        try {
            const result = await auth_service_1.authService.signup(req.body);
            (0, response_1.sendSuccess)(res, 201, 'Account created successfully.', result);
        }
        catch (err) {
            next(err);
        }
    },
    async login(req, res, next) {
        try {
            const result = await auth_service_1.authService.login(req.body);
            (0, response_1.sendSuccess)(res, 200, 'Logged in successfully.', result);
        }
        catch (err) {
            next(err);
        }
    },
    async getMe(req, res, next) {
        try {
            const result = await auth_service_1.authService.getMe(req.user.id);
            (0, response_1.sendSuccess)(res, 200, 'Profile fetched successfully.', result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map