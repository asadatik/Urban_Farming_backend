"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.orderController = {
    async placeOrder(req, res, next) {
        try {
            const { produceId, quantity } = req.body;
            const order = await order_service_1.orderService.placeOrder(req.user.userId, produceId, quantity ?? 1);
            (0, response_1.sendSuccess)(res, 201, 'Order placed successfully.', order);
        }
        catch (err) {
            next(err);
        }
    },
    async getMyOrders(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { status } = req.query;
            const { orders, total } = await order_service_1.orderService.getMyOrders(req.user.userId, pagination, status);
            (0, response_1.sendSuccess)(res, 200, 'Your orders fetched.', orders, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getOrderById(req, res, next) {
        try {
            const order = await order_service_1.orderService.getOrderById(req.params.id, req.user.userId, req.user.role);
            (0, response_1.sendSuccess)(res, 200, 'Order fetched.', order);
        }
        catch (err) {
            next(err);
        }
    },
    async cancelOrder(req, res, next) {
        try {
            const order = await order_service_1.orderService.cancelOrder(req.params.id, req.user.userId);
            (0, response_1.sendSuccess)(res, 200, 'Order cancelled.', order);
        }
        catch (err) {
            next(err);
        }
    },
    async updateOrderStatus(req, res, next) {
        try {
            const order = await order_service_1.orderService.updateOrderStatus(req.params.id, req.body.status);
            (0, response_1.sendSuccess)(res, 200, 'Order status updated.', order);
        }
        catch (err) {
            next(err);
        }
    },
    async getAllOrders(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { status } = req.query;
            const { orders, total } = await order_service_1.orderService.getAllOrders(pagination, status);
            (0, response_1.sendSuccess)(res, 200, 'All orders fetched.', orders, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=order.controller.js.map