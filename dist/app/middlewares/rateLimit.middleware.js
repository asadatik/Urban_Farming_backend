"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.generalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("../../config/env");
const response_1 = require("../utils/response");
/** General API rate limiter */
exports.generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_1.config.rateLimit.windowMs,
    max: env_1.config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
        (0, response_1.sendError)(res, 429, 'Too many requests. Please try again later.');
    },
});
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_1.config.rateLimit.windowMs,
    max: env_1.config.rateLimit.authMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: undefined,
    handler: (_req, res) => {
        (0, response_1.sendError)(res, 429, 'Too many authentication attempts. Please wait 15 minutes before retrying.');
    },
});
//# sourceMappingURL=rateLimit.middleware.js.map