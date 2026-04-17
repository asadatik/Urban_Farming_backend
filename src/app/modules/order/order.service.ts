
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export const orderService = {
// Customer/ place a new order
  async placeOrder(userId: string, produceId: string, quantity: number) {
    const produce = await prisma.produce.findUnique({ where: { id: produceId } });
    if (!produce) throw new AppError('Produce not found.', 404);
    if (produce.certificationStatus !== 'APPROVED')
      throw new AppError('This produce is not yet approved for sale.', 400);
    if (!produce.isActive) throw new AppError('This produce is no longer available.', 400);
    if (produce.availableQuantity < quantity)
      throw new AppError(
        `Insufficient stock. Available: ${produce.availableQuantity}, Requested: ${quantity}`,
        400
      );

    const totalPrice = parseFloat((Number(produce.price) * quantity).toFixed(2));

    // Use a transaction create order + decrement stock atomically
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          userId,
          produceId,
          vendorId: produce.vendorId,
          quantity,
          totalPrice,
          status: 'PENDING',
        },
        include: {
          produce: { select: { id: true, name: true, price: true } },
        },
      }),
      prisma.produce.update({
        where: { id: produceId },
        data: { availableQuantity: { decrement: quantity } },
      }),
    ]);

    return order;
  },

// Customer get own orders with optional status filter
  async getMyOrders(userId: string, pagination: PaginationParams, status?: string) {
    const where = { userId, ...(status && { status: status as any }) };
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { orderDate: 'desc' },
        include: {
          produce: { select: { id: true, name: true, imageUrl: true, price: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);
    return { orders, total };
  },

// customer can only access own orders, admin can access all
  async getOrderById(id: string, userId: string, role: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { produce: true },
    });
    if (!order) throw new AppError('Order not found.', 404);
    if (role !== 'ADMIN' && order.userId !== userId)
      throw new AppError('Access denied.', 403);
    return order;
  },

// Customer cancel order 
  async cancelOrder(id: string, userId: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError('Order not found.', 404);
    if (order.userId !== userId) throw new AppError('Access denied.', 403);
    if (order.status !== 'PENDING')
      throw new AppError('Only pending orders can be cancelled.', 400);

    const [updated] = await prisma.$transaction([
      prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } }),
      prisma.produce.update({
        where: { id: order.produceId },
        data: { availableQuantity: { increment: order.quantity } },
      }),
    ]);
    return updated;
  },

// Admin update order status
  async updateOrderStatus(id: string, status: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new AppError('Order not found.', 404);
    return prisma.order.update({ where: { id }, data: { status: status as any } });
  },

// Admin get all orders with optional status filter
  async getAllOrders(pagination: PaginationParams, status?: string) {
    const where = status ? { status: status as any } : {};
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { orderDate: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          produce: { select: { id: true, name: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);
    return { orders, total };
  },
};
