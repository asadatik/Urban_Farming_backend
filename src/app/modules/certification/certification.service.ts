
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export const certificationService = {
// list all certs with optional status filter
  async getAllCerts(pagination: PaginationParams, status?: string) {
    const where = status ? { certificationStatus: status as any } : {};
    const [certs, total] = await Promise.all([
      prisma.sustainabilityCert.findMany({
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
      prisma.sustainabilityCert.count({ where }),
    ]);
    return { certs, total };
  },

// get cert by id
  async submitCert(
    userId: string,
    data: {
      certifyingAgency: string;
      certificationDate: string;
      expiryDate?: string;
      documentUrl?: string;
    }
  ) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);

    return prisma.sustainabilityCert.create({
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
  async getMyCerts(userId: string) {
    const profile = await prisma.vendorProfile.findUnique({ where: { userId } });
    if (!profile) throw new AppError('Vendor profile not found.', 404);
    return prisma.sustainabilityCert.findMany({
      where: { vendorId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  },

// Admin approve or reject a cert
  async reviewCert(
    certId: string,
    status: 'APPROVED' | 'REJECTED',
    adminNotes?: string
  ) {
    const cert = await prisma.sustainabilityCert.findUnique({ where: { id: certId } });
    if (!cert) throw new AppError('Certification record not found.', 404);
    if (cert.certificationStatus !== 'PENDING')
      throw new AppError('Only PENDING certifications can be reviewed.', 400);

    const updated = await prisma.sustainabilityCert.update({
      where: { id: certId },
      data: { certificationStatus: status, adminNotes: adminNotes ?? null },
    });

    // If approved reflect on the vendor profile
    if (status === 'APPROVED') {
      await prisma.vendorProfile.update({
        where: { id: cert.vendorId },
        data: { certificationStatus: 'APPROVED' },
      });
    }

    return updated;
  },

// admin get cert by id
  async getCertById(id: string) {
    const cert = await prisma.sustainabilityCert.findUnique({
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
    if (!cert) throw new AppError('Certification not found.', 404);
    return cert;
  },
};
