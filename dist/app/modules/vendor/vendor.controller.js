"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorController = void 0;
const vendor_service_1 = require("./vendor.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.vendorController = {
    async getAllVendors(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { certStatus } = req.query;
            const { vendors, total } = await vendor_service_1.vendorService.getAllVendors(pagination, certStatus);
            (0, response_1.sendSuccess)(res, 200, 'Vendors fetched.', vendors, {
                page: pagination.page,
                limit: pagination.limit,
                total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getVendorById(req, res, next) {
        try {
            const vendor = await vendor_service_1.vendorService.getVendorById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'Vendor profile fetched.', vendor);
        }
        catch (err) {
            next(err);
        }
    },
    async updateMyProfile(req, res, next) {
        try {
            const vendor = await vendor_service_1.vendorService.updateVendorProfile(req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 200, 'Vendor profile updated.', vendor);
        }
        catch (err) {
            next(err);
        }
    },
    async approveVendor(req, res, next) {
        try {
            const { status } = req.body;
            const vendor = await vendor_service_1.vendorService.approveVendor(req.params.id, status);
            (0, response_1.sendSuccess)(res, 200, `Vendor certification ${status.toLowerCase()}.`, vendor);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=vendor.controller.js.map