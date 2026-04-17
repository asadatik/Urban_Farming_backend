"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.certificationService = {
    // list all certs with optional status filter
    async getAllCerts(pagination, status) {
        const where = status ? { certificationStatus: status } : {};
        const [certs, total] = await Promise.all([
            prisma_1.prisma.sustainabilityCert.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    vendor: {
                        select: {
                            id: true,
                            farmName: true,
                            farmLocation: true,
                            user: { select: { name: true, email: true } },
                        },
                    },
                },
            }),
            prisma_1.prisma.sustainabilityCert.count({ where }),
        ]);
        return { certs, total };
    },
    // get cert by id
    async submitCert(userId, data) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        return prisma_1.prisma.sustainabilityCert.create({
            data: {
                vendorId: profile.id,
                certifyingAgency: data.certifyingAgency,
                certificationDate: new Date(data.certificationDate),
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                documentUrl: data.documentUrl,
                certificationStatus: 'PENDING',
            },
        });
    },
    // Vendor get own certs
    async getMyCerts(userId) {
        const profile = await prisma_1.prisma.vendorProfile.findUnique({ where: { userId } });
        if (!profile)
            throw new AppError_1.AppError('Vendor profile not found.', 404);
        return prisma_1.prisma.sustainabilityCert.findMany({
            where: { vendorId: profile.id },
            orderBy: { createdAt: 'desc' },
        });
    },
    // Admin approve or reject a cert
    async reviewCert(certId, status, adminNotes) {
        const cert = await prisma_1.prisma.sustainabilityCert.findUnique({ where: { id: certId } });
        if (!cert)
            throw new AppError_1.AppError('Certification record not found.', 404);
        if (cert.certificationStatus !== 'PENDING')
            throw new AppError_1.AppError('Only PENDING certifications can be reviewed.', 400);
        const updated = await prisma_1.prisma.sustainabilityCert.update({
            where: { id: certId },
            data: { certificationStatus: status, adminNotes: adminNotes ?? null },
        });
        // If approved reflect on the vendor profile
        if (status === 'APPROVED') {
            await prisma_1.prisma.vendorProfile.update({
                where: { id: cert.vendorId },
                data: { certificationStatus: 'APPROVED' },
            });
        }
        return updated;
    },
    // admin get cert by id
    async getCertById(id) {
        const cert = await prisma_1.prisma.sustainabilityCert.findUnique({
            where: { id },
            include: {
                vendor: {
                    select: {
                        farmName: true,
                        user: { select: { name: true, email: true } },
                    },
                },
            },
        });
        if (!cert)
            throw new AppError_1.AppError('Certification not found.', 404);
        return cert;
    },
};
//# sourceMappingURL=certification.service.js.map