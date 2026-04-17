"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
const response_1 = require("../utils/response");
const globalErrorHandler = (err, req, res, _next) => {
    if (err instanceof AppError_1.AppError) {
        return (0, response_1.sendError)(res, err.statusCode, err.message);
    }
    if (err instanceof zod_1.ZodError) {
        const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
        return (0, response_1.sendError)(res, 400, 'Validation Error', messages);
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            const fields = err.meta?.target?.join(', ') ?? 'field';
            return (0, response_1.sendError)(res, 409, `Duplicate value on unique field: ${fields}`);
        }
        if (err.code === 'P2025') {
            return (0, response_1.sendError)(res, 404, 'Record not found');
        }
        return (0, response_1.sendError)(res, 400, `Database error: ${err.message}`);
    }
    if (err.name === 'JsonWebTokenError') {
        return (0, response_1.sendError)(res, 401, 'Invalid token. Please log in again.');
    }
    if (err.name === 'TokenExpiredError') {
        return (0, response_1.sendError)(res, 401, 'Your token has expired. Please log in again.');
    }
    console.error(' UNHANDLED ERROR:', err);
    return (0, response_1.sendError)(res, 500, process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message);
};
exports.globalErrorHandler = globalErrorHandler;
const notFoundHandler = (req, res) => {
    return (0, response_1.sendError)(res, 404, `Route ${req.originalUrl} not found`);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.middleware.js.map