"use strict";
// src/app/utils/response.ts
// Standardised API Response helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
/** Send a successful response */
const sendSuccess = (res, statusCode, message, data, meta) => {
    const payload = {
        success: true,
        statusCode,
        message,
        data,
        ...(meta && {
            meta: {
                ...meta,
                totalPages: meta.total ? Math.ceil(meta.total / meta.limit) : 0,
            },
        }),
    };
    return res.status(statusCode).json(payload);
};
exports.sendSuccess = sendSuccess;
/** Send an error response */
const sendError = (res, statusCode, message, data = null) => {
    const payload = {
        success: false,
        statusCode,
        message,
        data,
    };
    return res.status(statusCode).json(payload);
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map