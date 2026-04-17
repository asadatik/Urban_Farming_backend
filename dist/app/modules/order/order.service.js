"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.orderService = {
    //  place a new order
    async placeOrder(userId, produceId, quantity) {
        const produce = await prisma_1.prisma.produce.findUnique({ where: { id: produceId } });
        if (!produce)
            throw new AppError_1.AppError('Produce not found.', 404);
        if (produce.certificationStatus !== 'APPROVED')
            throw new AppError_1.AppError('This produce is not yet approved for sale.', 400);
        if (!produce.isActive)
            throw new AppError_1.AppError('This produce is no longer available.', 400);
        if (produce.availableQuantity < quantity)
            throw new AppError_1.AppError(`Insufficient stock. Available: ${produce.availableQuantity}, Requested: ${quantity}`, 400);
        const totalPrice = parseFloat((Number(produce.price) * quantity).toFixed(2));
        // Use a transaction create order + decrement stock atomically
        const [order] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.order.create({
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
            prisma_1.prisma.produce.update({
                where: { id: produceId },
                data: { availableQuantity: { decrement: quantity } },
            }),
        ]);
        return order;
    },
    // Customer get own orders with optional status filter
    async getMyOrders(userId, pagination, status) {
        const where = { userId, ...(status && { status: status }) };
        const [orders, total] = await Promise.all([
            prisma_1.prisma.order.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { orderDate: 'desc' },
                include: {
                    produce: { select: { id: true, name: true, imageUrl: true, price: true } },
                },
            }),
            prisma_1.prisma.order.count({ where }),
        ]);
        return { orders, total };
    },
    // customer can only access own orders, admin can access all
    async getOrderById(id, userId, role) {
        const order = await prisma_1.prisma.order.findUnique({
            where: { id },
            include: { produce: true },
        });
        if (!order)
            throw new AppError_1.AppError('Order not found.', 404);
        if (role !== 'ADMIN' && order.userId !== userId)
            throw new AppError_1.AppError('Access denied.', 403);
        return order;
    },
    // Customer cancel order 
    async cancelOrder(id, userId) {
        const order = await prisma_1.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new AppError_1.AppError('Order not found.', 404);
        if (order.userId !== userId)
            throw new AppError_1.AppError('Access denied.', 403);
        if (order.status !== 'PENDING')
            throw new AppError_1.AppError('Only pending orders can be cancelled.', 400);
        const [updated] = await prisma_1.prisma.$transaction([
            prisma_1.prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } }),
            prisma_1.prisma.produce.update({
                where: { id: order.produceId },
                data: { availableQuantity: { increment: order.quantity } },
            }),
        ]);
        return updated;
    },
    // Admin update order status
    async updateOrderStatus(id, status) {
        const order = await prisma_1.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new AppError_1.AppError('Order not found.', 404);
        return prisma_1.prisma.order.update({ where: { id }, data: { status: status } });
    },
    // Admin get all orders with optional status filter
    async getAllOrders(pagination, status) {
        const where = status ? { status: status } : {};
        const [orders, total] = await Promise.all([
            prisma_1.prisma.order.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { orderDate: 'desc' },
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    produce: { select: { id: true, name: true } },
                },
            }),
            prisma_1.prisma.order.count({ where }),
        ]);
        return { orders, total };
    },
};
//# sourceMappingURL=order.service.js.map