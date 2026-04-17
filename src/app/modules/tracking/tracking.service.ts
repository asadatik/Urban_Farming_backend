
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

const VALID_STATUSES = ['SEEDLING', 'GROWING', 'FLOWERING', 'FRUITING', 'HARVESTING', 'HARVESTED'];

export const trackingService = {
//  start tracking a new plant in a rental space
  async startTracking(
    userId: string,
    data: {
      rentalSpaceId: string;
      plantName: string;
      healthNotes?: string;
      plantedDate?: string;
    }
  ) {
    // verify the rental space exists
    const space = await prisma.rentalSpace.findUnique({ where: { id: data.rentalSpaceId } });
    if (!space) throw new AppError('Rental space not found.', 404);
    if (!space.availability) throw new AppError('This rental space is not currently available.', 400);

    return prisma.plantTracking.create({
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
  async getMyTrackings(userId: string, pagination: PaginationParams, status?: string) {
    const where = { userId, ...(status && { status: status as any }) };
    const [trackings, total] = await Promise.all([
      prisma.plantTracking.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { plantedDate: 'desc' },
        include: {
          rentalSpace: { select: { id: true, location: true, size: true } },
        },
      }),
      prisma.plantTracking.count({ where }),
    ]);
    return { trackings, total };
  },

 // get a specific tracking record by ID, ensuring the user has access
  async getTrackingById(id: string, userId: string, role: string) {
    const tracking = await prisma.plantTracking.findUnique({
      where: { id },
      include: { rentalSpace: true },
    });
    if (!tracking) throw new AppError('Plant tracking record not found.', 404);
    if (role !== 'ADMIN' && tracking.userId !== userId)
      throw new AppError('Access denied.', 403);
    return tracking;
  },


// update the status and optionally health notes 
  async updateTrackingStatus(
    id: string,
    userId: string,
    data: { status: string; healthNotes?: string; harvestDate?: string }
  ) {
    if (!VALID_STATUSES.includes(data.status))
      throw new AppError(`Invalid status. Valid values: ${VALID_STATUSES.join(', ')}`, 400);

    const tracking = await prisma.plantTracking.findUnique({ where: { id } });
    if (!tracking) throw new AppError('Plant tracking record not found.', 404);
    if (tracking.userId !== userId)
      throw new AppError('You can only update your own plant records.', 403);

    return prisma.plantTracking.update({
      where: { id },
      data: {
        status: data.status as any,
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
  async deleteTracking(id: string, userId: string) {
    const tracking = await prisma.plantTracking.findUnique({ where: { id } });
    if (!tracking) throw new AppError('Plant tracking record not found.', 404);
    if (tracking.userId !== userId)
      throw new AppError('You can only delete your own plant records.', 403);
    await prisma.plantTracking.delete({ where: { id } });
    return { id };
  },

//admin can get all tracking records
  async getAllTrackings(pagination: PaginationParams, status?: string) {
    const where = status ? { status: status as any } : {};
    const [trackings, total] = await Promise.all([
      prisma.plantTracking.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { plantedDate: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          rentalSpace: { select: { id: true, location: true } },
        },
      }),
      prisma.plantTracking.count({ where }),
    ]);
    return { trackings, total };
  },
};
