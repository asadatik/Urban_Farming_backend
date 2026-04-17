"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.vendorService = {
    async getAllVendors(pagination, certStatus) {
        const where = certStatus ? { certificationStatus: certStatus } : {};
        const [vendors, total] = await Promise.all([
            prisma_1.prisma.vendorProfile.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true, status: true } },
                    sustainabilityCerts: { orderBy: { createdAt: 'desc' }, take: 1 },
                },
            }),
            prisma_1.prisma.vendorProfile.count({ where }),
        ]);
        return { vendors, total };
    },
    async getVendorById(id) {
        const vendor = await prisma_1.prisma.vendorProfile.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true } },
                produces: {
                    where: { isActive: true, certificationStatus: 'APPROVED' },
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
                rentalSpaces: { where: { availability: true }, take: 5 },
                sustainabilityCerts: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!vendor)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        return vendor;
    },
    async updateVendorProfile(userId, data) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        return prisma_1.prisma.vendorProfile.update({ where: { userId }, data });
    },
    // admin controll vendor applications
    async approveVendor(vendorProfileId, status) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { id: vendorProfileId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        const updated = await prisma_1.prisma.vendorProfile.update({
            where: { id: vendorProfileId },
            data: { certificationStatus: status },
        });
        // if approved, set all pending produce to approved. If rejected, set all pending produce to rejected.
        await prisma_1.prisma.sustainabilityCert.updateMany({
            where: { vendorId: vendorProfileId, certificationStatus: 'PENDING' },
            data: { certificationStatus: status },
        });
        return updated;
    },
};
//# sourceMappingURL=vendor.service.js.map