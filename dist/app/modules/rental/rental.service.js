"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.rentalService = {
    // get rental spaces with optional filters and pagination
    async getRentalSpaces(pagination, filters) {
        const where = {
            ...(filters.availability !== undefined && {
                availability: filters.availability === 'true',
            }),
            ...(filters.location && {
                location: { contains: filters.location, mode: 'insensitive' },
            }),
            ...(filters.minPrice || filters.maxPrice
                ? {
                    price: {
                        ...(filters.minPrice && { gte: parseFloat(filters.minPrice) }),
                        ...(filters.maxPrice && { lte: parseFloat(filters.maxPrice) }),
                    },
                }
                : {}),
        };
        const [spaces, total] = await Promise.all([
            prisma_1.prisma.rentalSpace.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    vendor: { select: { id: true, farmName: true, farmLocation: true } },
                },
            }),
            prisma_1.prisma.rentalSpace.count({ where }),
        ]);
        return { spaces, total };
    },
    async getRentalById(id) {
        const space = await prisma_1.prisma.rentalSpace.findUnique({
            where: { id },
            include: {
                vendor: { select: { id: true, farmName: true, farmLocation: true, certificationStatus: true } },
            },
        });
        if (!space)
            throw new AppError_1.AppError('Rental space not found.', 404);
        return space;
    },
    async createRentalSpace(userId, data) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        return prisma_1.prisma.rentalSpace.create({ data: { ...data, vendorId: profile.id } });
    },
    async updateRentalSpace(id, userId, data) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        const space = await prisma_1.prisma.rentalSpace.findUnique({ where: { id } });
        if (!space)
            throw new AppError_1.AppError('Rental space not found.', 404);
        if (space.vendorId !== profile.id)
            throw new AppError_1.AppError('You can only update your own rental spaces.', 403);
        return prisma_1.prisma.rentalSpace.update({ where: { id }, data });
    },
    async deleteRentalSpace(id, userId) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        const space = await prisma_1.prisma.rentalSpace.findUnique({ where: { id } });
        if (!space)
            throw new AppError_1.AppError('Rental space not found.', 404);
        if (space.vendorId !== profile.id)
            throw new AppError_1.AppError('You can only delete your own rental spaces.', 403);
        await prisma_1.prisma.rentalSpace.delete({ where: { id } });
        return { id };
    },
};
//# sourceMappingURL=rental.service.js.map