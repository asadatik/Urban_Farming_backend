"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.produceService = {
    // Public
    async getMarketplace(pagination, filters) {
        const where = {
            isActive: true,
            certificationStatus: filters.certificationStatus
                ? filters.certificationStatus
                : 'APPROVED',
            ...(filters.category && { category: filters.category }),
            ...(filters.search && {
                OR: [
                    { name: { contains: filters.search, mode: 'insensitive' } },
                    { description: { contains: filters.search, mode: 'insensitive' } },
                ],
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
        const [produces, total] = await Promise.all([
            prisma_1.prisma.produce.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    category: true,
                    certificationStatus: true,
                    availableQuantity: true,
                    imageUrl: true,
                    vendor: {
                        select: { id: true, farmName: true, farmLocation: true },
                    },
                },
            }),
            prisma_1.prisma.produce.count({ where }),
        ]);
        return { produces, total };
    },
    // Vendor Get produce details by ID
    async getProduceById(id) {
        const produce = await prisma_1.prisma.produce.findUnique({
            where: { id },
            include: {
                vendor: {
                    select: { id: true, farmName: true, farmLocation: true, certificationStatus: true },
                },
            },
        });
        if (!produce)
            throw new AppError_1.AppError('Produce not found.', 404);
        return produce;
    },
    // Vendor Get all produce listings for a vendor
    async getVendorProduce(vendorProfileId, pagination) {
        const [produces, total] = await Promise.all([
            prisma_1.prisma.produce.findMany({
                where: { vendorId: vendorProfileId },
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma_1.prisma.produce.count({ where: { vendorId: vendorProfileId } }),
        ]);
        return { produces, total };
    },
    // Create new produce listing
    async createProduce(vendorProfileId, data) {
        return prisma_1.prisma.produce.create({
            data: {
                ...data,
                certificationStatus: 'PENDING',
                vendor: {
                    connect: { id: vendorProfileId }
                }
            },
        });
    },
    // Update produce listing
    async updateProduce(id, vendorProfileId, data) {
        const produce = await prisma_1.prisma.produce.findUnique({ where: { id } });
        if (!produce)
            throw new AppError_1.AppError('Produce not found.', 404);
        if (produce.vendorId !== vendorProfileId)
            throw new AppError_1.AppError('You can only update your own produce listings.', 403);
        return prisma_1.prisma.produce.update({ where: { id }, data });
    },
    // Delete produce listing
    async deleteProduce(id, vendorProfileId) {
        const produce = await prisma_1.prisma.produce.findUnique({ where: { id } });
        if (!produce)
            throw new AppError_1.AppError('Produce not found.', 404);
        if (produce.vendorId !== vendorProfileId)
            throw new AppError_1.AppError('You can only delete your own produce listings.', 403);
        await prisma_1.prisma.produce.delete({ where: { id } });
        return { id };
    },
    // Admin
    async updateCertificationStatus(id, certificationStatus) {
        const produce = await prisma_1.prisma.produce.findUnique({ where: { id } });
        if (!produce)
            throw new AppError_1.AppError('Produce not found.', 404);
        return prisma_1.prisma.produce.update({ where: { id }, data: { certificationStatus } });
    },
    //get vendor profile id by user id 
    async getVendorProfileId(userId) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found. Please complete your vendor registration.', 404);
        return profile.id;
    },
};
//# sourceMappingURL=produce.service.js.map