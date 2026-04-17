
import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export interface RentalFilters {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string;
}
export const rentalService = {
  // get rental spaces with optional filters and pagination
  async getRentalSpaces(pagination: PaginationParams, filters: RentalFilters) {
    const where: Prisma.RentalSpaceWhereInput = {
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
      prisma.rentalSpace.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          vendor: { select: { id: true, farmName: true, farmLocation: true } },
        },
      }),
      prisma.rentalSpace.count({ where }),
    ]);
    return { spaces, total };
  },

  async getRentalById(id: string) {
    const space = await prisma.rentalSpace.findUnique({
      where: { id },
      include: {
        vendor: { select: { id: true, farmName: true, farmLocation: true, certificationStatus: true } },
      },
    });
    if (!space) throw new AppError('Rental space not found.', 404);
    return space;
  },

  async createRentalSpace(
    userId: string,
    data: { location: string; size: string; price: number; description?: string }
  ) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);
    return prisma.rentalSpace.create({ data: { ...data, vendorId: profile.id } });
  },

  async updateRentalSpace(id: string, userId: string, data: Partial<{ location: string; size: string; price: number; availability: boolean; description: string }>) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);
    const space = await prisma.rentalSpace.findUnique({ where: { id } });
    if (!space) throw new AppError('Rental space not found.', 404);
    if (space.vendorId !== profile.id)
      throw new AppError('You can only update your own rental spaces.', 403);
    return prisma.rentalSpace.update({ where: { id }, data });
  },

  async deleteRentalSpace(id: string, userId: string) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);
    const space = await prisma.rentalSpace.findUnique({ where: { id } });
    if (!space) throw new AppError('Rental space not found.', 404);
    if (space.vendorId !== profile.id)
      throw new AppError('You can only delete your own rental spaces.', 403);
    await prisma.rentalSpace.delete({ where: { id } });
    return { id };
  },
};
