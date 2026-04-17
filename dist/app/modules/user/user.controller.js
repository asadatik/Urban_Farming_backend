"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.userController = {
    async getAllUsers(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { role, status } = req.query;
            const { users, total } = await user_service_1.userService.getAllUsers(pagination, role, status);
            (0, response_1.sendSuccess)(res, 200, 'Users fetched successfully.', users, {
                page: pagination.page,
                limit: pagination.limit,
                total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getUserById(req, res, next) {
        try {
            const user = await user_service_1.userService.getUserById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'User fetched successfully.', user);
        }
        catch (err) {
            next(err);
        }
    },
    async updateUserStatus(req, res, next) {
        try {
            const { status } = req.body;
            const user = await user_service_1.userService.updateUserStatus(req.params.id, status);
            (0, response_1.sendSuccess)(res, 200, 'User status updated successfully.', user);
        }
        catch (err) {
            next(err);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const result = await user_service_1.userService.deleteUser(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'User deleted successfully.', result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=user.controller.js.map