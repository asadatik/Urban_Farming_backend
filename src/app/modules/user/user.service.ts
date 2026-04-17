
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export const userService = {

  async getAllUsers(pagination: PaginationParams, role?: string, status?: string) {
    const where = {
      ...(role && { role: role as any }),
      ...(status && { status: status as any }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          vendorProfile: {
            select: { id: true, farmName: true, certificationStatus: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  },


  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        vendorProfile: true,
        orders: {
          orderBy: { orderDate: 'desc' },
          take: 5,
          select: { id: true, status: true, totalPrice: true, orderDate: true },
        },
      },
    });
    if (!user) throw new AppError('User not found.', 404);
    return user;
  },

  async updateUserStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found.', 404);

    return prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
  },


  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError('User not found.', 404);
    await prisma.user.delete({ where: { id } });
    return { id };
  },
};
