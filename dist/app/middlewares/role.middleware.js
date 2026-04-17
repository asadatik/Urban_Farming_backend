"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorise = void 0;
const AppError_1 = require("../utils/AppError");
const authorise = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            return next(new AppError_1.AppError('Authentication required.', 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new AppError_1.AppError(`Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`, 403));
        }
        next();
    };
};
exports.authorise = authorise;
//# sourceMappingURL=role.middleware.js.map