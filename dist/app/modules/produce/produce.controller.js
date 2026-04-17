"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceController = void 0;
const produce_service_1 = require("./produce.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.produceController = {
    // Public
    async getMarketplace(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { search, category, minPrice, maxPrice, certificationStatus } = req.query;
            const { produces, total } = await produce_service_1.produceService.getMarketplace(pagination, {
                search,
                category,
                minPrice,
                maxPrice,
                certificationStatus,
            });
            (0, response_1.sendSuccess)(res, 200, 'Marketplace produce fetched.', produces, {
                page: pagination.page,
                limit: pagination.limit,
                total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getProduceById(req, res, next) {
        try {
            const produce = await produce_service_1.produceService.getProduceById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'Produce fetched.', produce);
        }
        catch (err) {
            next(err);
        }
    },
    //  Vendor 
    async getMyProduce(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const vendorProfileId = await produce_service_1.produceService.getVendorProfileId(req.user.userId);
            const { produces, total } = await produce_service_1.produceService.getVendorProduce(vendorProfileId, pagination);
            (0, response_1.sendSuccess)(res, 200, 'Your produce listings fetched.', produces, {
                page: pagination.page,
                limit: pagination.limit,
                total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async createProduce(req, res, next) {
        try {
            const vendorProfileId = await produce_service_1.produceService.getVendorProfileId(req.user.userId);
            const produce = await produce_service_1.produceService.createProduce(vendorProfileId, req.body);
            (0, response_1.sendSuccess)(res, 201, 'Produce listing created. Awaiting certification approval.', produce);
        }
        catch (err) {
            next(err);
        }
    },
    async updateProduce(req, res, next) {
        try {
            const vendorProfileId = await produce_service_1.produceService.getVendorProfileId(req.user.userId);
            const produce = await produce_service_1.produceService.updateProduce(req.params.id, vendorProfileId, req.body);
            (0, response_1.sendSuccess)(res, 200, 'Produce updated.', produce);
        }
        catch (err) {
            next(err);
        }
    },
    async deleteProduce(req, res, next) {
        try {
            const vendorProfileId = await produce_service_1.produceService.getVendorProfileId(req.user.userId);
            const result = await produce_service_1.produceService.deleteProduce(req.params.id, vendorProfileId);
            (0, response_1.sendSuccess)(res, 200, 'Produce deleted.', result);
        }
        catch (err) {
            next(err);
        }
    },
    // Admin
    async updateCertificationStatus(req, res, next) {
        try {
            const { certificationStatus } = req.body;
            const produce = await produce_service_1.produceService.updateCertificationStatus(req.params.id, certificationStatus);
            (0, response_1.sendSuccess)(res, 200, `Produce certification status updated to ${certificationStatus}.`, produce);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=produce.controller.js.map