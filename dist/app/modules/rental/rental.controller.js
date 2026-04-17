"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalController = void 0;
const rental_service_1 = require("./rental.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.rentalController = {
    async getRentalSpaces(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { location, minPrice, maxPrice, availability } = req.query;
            const { spaces, total } = await rental_service_1.rentalService.getRentalSpaces(pagination, {
                location, minPrice, maxPrice, availability,
            });
            (0, response_1.sendSuccess)(res, 200, 'Rental spaces fetched.', spaces, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getRentalById(req, res, next) {
        try {
            const space = await rental_service_1.rentalService.getRentalById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'Rental space fetched.', space);
        }
        catch (err) {
            next(err);
        }
    },
    async createRentalSpace(req, res, next) {
        try {
            const space = await rental_service_1.rentalService.createRentalSpace(req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 201, 'Rental space created.', space);
        }
        catch (err) {
            next(err);
        }
    },
    async updateRentalSpace(req, res, next) {
        try {
            const space = await rental_service_1.rentalService.updateRentalSpace(req.params.id, req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 200, 'Rental space updated.', space);
        }
        catch (err) {
            next(err);
        }
    },
    async deleteRentalSpace(req, res, next) {
        try {
            const result = await rental_service_1.rentalService.deleteRentalSpace(req.params.id, req.user.userId);
            (0, response_1.sendSuccess)(res, 200, 'Rental space deleted.', result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=rental.controller.js.map