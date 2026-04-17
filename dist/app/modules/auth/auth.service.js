"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
const AppError_1 = require("../../utils/AppError");
exports.authService = {
    async signup(payload) {
        const existing = await prisma_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (existing)
            throw new AppError_1.AppError('Email is already registered.', 409);
        const hashedPassword = await (0, bcrypt_1.hashPassword)(payload.password);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                role: payload.role ?? 'CUSTOMER',
                ...(payload.role === 'VENDOR' && {
                    vendorProfile: {
                        create: {
                            farmName: `${payload.name}'s Farm`,
                            farmLocation: 'To be updated',
                            certificationStatus: 'PENDING',
                        },
                    },
                }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        const accessToken = (0, jwt_1.signToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { accessToken, user };
    },
    /**
     * Login
     */
    async login(payload) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: payload.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                status: true,
            },
        });
        if (!user)
            throw new AppError_1.AppError('Invalid email or password.', 401);
        if (user.status === 'SUSPENDED')
            throw new AppError_1.AppError('Your account has been suspended. Please contact support.', 403);
        if (user.status === 'INACTIVE')
            throw new AppError_1.AppError('Your account is inactive.', 403);
        const passwordMatch = await (0, bcrypt_1.comparePassword)(payload.password, user.password);
        if (!passwordMatch)
            throw new AppError_1.AppError('Invalid email or password.', 401);
        const accessToken = (0, jwt_1.signToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            accessToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    },
    /**
     * Get own profile
     */
    async getMe(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                vendorProfile: {
                    select: {
                        id: true,
                        farmName: true,
                        farmLocation: true,
                        certificationStatus: true,
                    },
                },
            },
        });
        if (!user)
            throw new AppError_1.AppError('User not found.', 404);
        return user;
    },
};
//# sourceMappingURL=auth.service.js.map