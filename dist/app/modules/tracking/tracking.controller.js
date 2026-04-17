"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingController = void 0;
const tracking_service_1 = require("./tracking.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.trackingController = {
    async startTracking(req, res, next) {
        try {
            const tracking = await tracking_service_1.trackingService.startTracking(req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 201, 'Plant tracking started.', tracking);
        }
        catch (err) {
            next(err);
        }
    },
    async getMyTrackings(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { status } = req.query;
            const { trackings, total } = await tracking_service_1.trackingService.getMyTrackings(req.user.userId, pagination, status);
            (0, response_1.sendSuccess)(res, 200, 'Your plant trackings fetched.', trackings, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getTrackingById(req, res, next) {
        try {
            const tracking = await tracking_service_1.trackingService.getTrackingById(req.params.id, req.user.userId, req.user.role);
            (0, response_1.sendSuccess)(res, 200, 'Tracking record fetched.', tracking);
        }
        catch (err) {
            next(err);
        }
    },
    async updateTrackingStatus(req, res, next) {
        try {
            const tracking = await tracking_service_1.trackingService.updateTrackingStatus(req.params.id, req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 200, `Plant status updated to "${req.body.status}".`, tracking);
        }
        catch (err) {
            next(err);
        }
    },
    async deleteTracking(req, res, next) {
        try {
            const result = await tracking_service_1.trackingService.deleteTracking(req.params.id, req.user.userId);
            (0, response_1.sendSuccess)(res, 200, 'Tracking record deleted.', result);
        }
        catch (err) {
            next(err);
        }
    },
    async getAllTrackings(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { status } = req.query;
            const { trackings, total } = await tracking_service_1.trackingService.getAllTrackings(pagination, status);
            (0, response_1.sendSuccess)(res, 200, 'All plant trackings fetched.', trackings, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=tracking.controller.js.map