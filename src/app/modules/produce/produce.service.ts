
import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';
import { CreateProduceInput, UpdateProduceInput } from './produce.validation';

export interface ProduceFilters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  certificationStatus?: string;
}

export const produceService = {
// Public
  async getMarketplace(pagination: PaginationParams, filters: ProduceFilters) {
    const where: Prisma.ProduceWhereInput = {
      isActive: true,
      certificationStatus: filters.certificationStatus
        ? (filters.certificationStatus as any)
        : 'APPROVED',
      ...(filters.category && { category: filters.category as any }),
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
      prisma.produce.findMany({
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
      prisma.produce.count({ where }),
    ]);

    return { produces, total };
  },

// Vendor Get produce details by ID
  async getProduceById(id: string) {
    const produce = await prisma.produce.findUnique({
      where: { id },
      include: {
        vendor: {
          select: { id: true, farmName: true, farmLocation: true, certificationStatus: true },
        },
      },
    });
    if (!produce) throw new AppError('Produce not found.', 404);
    return produce;
  },
// Vendor Get all produce listings for a vendor
  async getVendorProduce(vendorProfileId: string, pagination: PaginationParams) {
    const [produces, total] = await Promise.all([
      prisma.produce.findMany({
        where: { vendorId: vendorProfileId },
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.produce.count({ where: { vendorId: vendorProfileId } }),
    ]);
    return { produces, total };
  },

// Create new produce listing
async createProduce(vendorProfileId: string, data: CreateProduceInput) {
  return prisma.produce.create({
    data: {
      ...data,
      certificationStatus: 'PENDING',
      vendor: {
        connect: { id: vendorProfileId }
      }
    } as any,
  });
},
// Update produce listing
  async updateProduce(id: string, vendorProfileId: string, data: UpdateProduceInput) {
    const produce = await prisma.produce.findUnique({ where: { id } });
    if (!produce) throw new AppError('Produce not found.', 404);
    if (produce.vendorId !== vendorProfileId)
      throw new AppError('You can only update your own produce listings.', 403);

    return prisma.produce.update({ where: { id }, data });
  },

// Delete produce listing
  async deleteProduce(id: string, vendorProfileId: string) {
    const produce = await prisma.produce.findUnique({ where: { id } });
    if (!produce) throw new AppError('Produce not found.', 404);
    if (produce.vendorId !== vendorProfileId)
      throw new AppError('You can only delete your own produce listings.', 403);
    await prisma.produce.delete({ where: { id } });
    return { id };
  },

// Admin
  async updateCertificationStatus(
    id: string,
    certificationStatus: 'APPROVED' | 'REJECTED' | 'PENDING'
  ) {
    const produce = await prisma.produce.findUnique({ where: { id } });
    if (!produce) throw new AppError('Produce not found.', 404);
    return prisma.produce.update({ where: { id }, data: { certificationStatus } });
  },

//get vendor profile id by user id 
  async getVendorProfileId(userId: string): Promise<string> {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile)
      throw new AppError(
        'Vendor profile not found. Please complete your vendor registration.',
        404
      );
    return profile.id;
  },
};