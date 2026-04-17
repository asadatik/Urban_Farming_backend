"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationController = void 0;
const certification_service_1 = require("./certification.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.certificationController = {
    async getAllCerts(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { status } = req.query;
            const { certs, total } = await certification_service_1.certificationService.getAllCerts(pagination, status);
            (0, response_1.sendSuccess)(res, 200, 'Certifications fetched.', certs, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getCertById(req, res, next) {
        try {
            const cert = await certification_service_1.certificationService.getCertById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'Certification fetched.', cert);
        }
        catch (err) {
            next(err);
        }
    },
    async getMyCerts(req, res, next) {
        try {
            const certs = await certification_service_1.certificationService.getMyCerts(req.user.userId);
            (0, response_1.sendSuccess)(res, 200, 'Your certifications fetched.', certs);
        }
        catch (err) {
            next(err);
        }
    },
    async submitCert(req, res, next) {
        try {
            const cert = await certification_service_1.certificationService.submitCert(req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 201, 'Certification submitted for review.', cert);
        }
        catch (err) {
            next(err);
        }
    },
    async reviewCert(req, res, next) {
        try {
            const { status, adminNotes } = req.body;
            const cert = await certification_service_1.certificationService.reviewCert(req.params.id, status, adminNotes);
            (0, response_1.sendSuccess)(res, 200, `Certification ${status.toLowerCase()} successfully.`, cert);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=certification.controller.js.map