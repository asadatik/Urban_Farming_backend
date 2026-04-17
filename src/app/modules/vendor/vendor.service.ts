
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export const vendorService = {

  async getAllVendors(pagination: PaginationParams, certStatus?: string) {
    const where = certStatus ? { certificationStatus: certStatus as any } : {};
    const [vendors, total] = await Promise.all([
      prisma.vendorProfile.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          sustainabilityCerts: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
      }),
      prisma.vendorProfile.count({ where }),
    ]);
    return { vendors, total };
  },


  async getVendorById(id: string) {
    const vendor = await prisma.vendorProfile.findUnique({
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
    if (!vendor) throw new AppError('Vendor profile not found.', 404);
    return vendor;
  },


  async updateVendorProfile(
    userId: string,
    data: { farmName?: string; farmLocation?: string; farmDescription?: string }
  ) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);
    return prisma.vendorProfile.update({ where: { userId }, data });
  },

// admin controll vendor applications
  async approveVendor(vendorProfileId: string, status: 'APPROVED' | 'REJECTED') {
    const profile = await prisma.vendorProfile.findUnique({ where: { id: vendorProfileId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);

    const updated = await prisma.vendorProfile.update({
      where: { id: vendorProfileId },
      data: { certificationStatus: status },
    });

  // if approved, set all pending produce to approved. If rejected, set all pending produce to rejected.
    await prisma.sustainabilityCert.updateMany({
      where: { vendorId: vendorProfileId, certificationStatus: 'PENDING' },
      data: { certificationStatus: status },
    });

    return updated;
  },
};
