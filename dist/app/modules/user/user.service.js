"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.userService = {
    async getAllUsers(pagination, role, status) {
        const where = {
            ...(role && { role: role }),
            ...(status && { status: status }),
        };
        const [users, total] = await Promise.all([
            prisma_1.prisma.user.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    vendorProfile: {
                        select: { id: true, farmName: true, certificationStatus: true },
                    },
                },
            }),
            prisma_1.prisma.user.count({ where }),
        ]);
        return { users, total };
    },
    async getUserById(id) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
                vendorProfile: true,
                orders: {
                    orderBy: { orderDate: 'desc' },
                    take: 5,
                    select: { id: true, status: true, totalPrice: true, orderDate: true },
                },
            },
        });
        if (!user)
            throw new AppError_1.AppError('User not found.', 404);
        return user;
    },
    async updateUserStatus(id, status) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new AppError_1.AppError('User not found.', 404);
        return prisma_1.prisma.user.update({
            where: { id },
            data: { status },
            select: { id: true, name: true, email: true, role: true, status: true },
        });
    },
    async deleteUser(id) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new AppError_1.AppError('User not found.', 404);
        await prisma_1.prisma.user.delete({ where: { id } });
        return { id };
    },
};
//# sourceMappingURL=user.service.js.map