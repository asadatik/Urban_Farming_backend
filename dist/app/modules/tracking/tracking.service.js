"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
const VALID_STATUSES = ['SEEDLING', 'GROWING', 'FLOWERING', 'FRUITING', 'HARVESTING', 'HARVESTED'];
exports.trackingService = {
    //  start tracking a new plant in a rental space
    async startTracking(userId, data) {
        // verify the rental space exists
        const space = await prisma_1.prisma.rentalSpace.findUnique({ where: { id: data.rentalSpaceId } });
        if (!space)
            throw new AppError_1.AppError('Rental space not found.', 404);
        if (!space.availability)
            throw new AppError_1.AppError('This rental space is not currently available.', 400);
        return prisma_1.prisma.plantTracking.create({
            data: {
                userId,
                rentalSpaceId: data.rentalSpaceId,
                plantName: data.plantName,
                healthNotes: data.healthNotes,
                status: 'SEEDLING',
                plantedDate: data.plantedDate ? new Date(data.plantedDate) : new Date(),
            },
            include: {
                rentalSpace: { select: { id: true, location: true, size: true } },
            },
        });
    },
    // get all tracking records for the authenticated user, with optional status filter and pagination
    async getMyTrackings(userId, pagination, status) {
        const where = { userId, ...(status && { status: status }) };
        const [trackings, total] = await Promise.all([
            prisma_1.prisma.plantTracking.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { plantedDate: 'desc' },
                include: {
                    rentalSpace: { select: { id: true, location: true, size: true } },
                },
            }),
            prisma_1.prisma.plantTracking.count({ where }),
        ]);
        return { trackings, total };
    },
    // get a specific tracking record by ID, ensuring the user has access
    async getTrackingById(id, userId, role) {
        const tracking = await prisma_1.prisma.plantTracking.findUnique({
            where: { id },
            include: { rentalSpace: true },
        });
        if (!tracking)
            throw new AppError_1.AppError('Plant tracking record not found.', 404);
        if (role !== 'ADMIN' && tracking.userId !== userId)
            throw new AppError_1.AppError('Access denied.', 403);
        return tracking;
    },
    // update the status and optionally health notes 
    async updateTrackingStatus(id, userId, data) {
        if (!VALID_STATUSES.includes(data.status))
            throw new AppError_1.AppError(`Invalid status. Valid values: ${VALID_STATUSES.join(', ')}`, 400);
        const tracking = await prisma_1.prisma.plantTracking.findUnique({ where: { id } });
        if (!tracking)
            throw new AppError_1.AppError('Plant tracking record not found.', 404);
        if (tracking.userId !== userId)
            throw new AppError_1.AppError('You can only update your own plant records.', 403);
        return prisma_1.prisma.plantTracking.update({
            where: { id },
            data: {
                status: data.status,
                healthNotes: data.healthNotes ?? tracking.healthNotes,
                harvestDate: data.status === 'HARVESTED'
                    ? (data.harvestDate ? new Date(data.harvestDate) : new Date())
                    : tracking.harvestDate,
            },
            include: {
                rentalSpace: { select: { id: true, location: true } },
            },
        });
    },
    // delete a tracking record, ensuring the user has access
    async deleteTracking(id, userId) {
        const tracking = await prisma_1.prisma.plantTracking.findUnique({ where: { id } });
        if (!tracking)
            throw new AppError_1.AppError('Plant tracking record not found.', 404);
        if (tracking.userId !== userId)
            throw new AppError_1.AppError('You can only delete your own plant records.', 403);
        await prisma_1.prisma.plantTracking.delete({ where: { id } });
        return { id };
    },
    //admin can get all tracking records
    async getAllTrackings(pagination, status) {
        const where = status ? { status: status } : {};
        const [trackings, total] = await Promise.all([
            prisma_1.prisma.plantTracking.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { plantedDate: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    rentalSpace: { select: { id: true, location: true } },
                },
            }),
            prisma_1.prisma.plantTracking.count({ where }),
        ]);
        return { trackings, total };
    },
};
//# sourceMappingURL=tracking.service.js.map