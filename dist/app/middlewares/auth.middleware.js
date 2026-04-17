"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const prisma_1 = require("../utils/prisma");
const AppError_1 = require("../utils/AppError");
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.AppError('Authentication required. Please provide a Bearer token.', 401);
        }
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        // Verify user still exists and is active
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true, status: true },
        });
        if (!user)
            throw new AppError_1.AppError('User no longer exists.', 401);
        if (user.status === 'SUSPENDED')
            throw new AppError_1.AppError('Your account has been suspended. Contact support.', 403);
        if (user.status === 'INACTIVE')
            throw new AppError_1.AppError('Your account is inactive.', 403);
        req.user = { userId: user.id, id: user.id, email: user.email, role: user.role };
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map