
import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const orderController = {
  async placeOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { produceId, quantity } = req.body;
      const order = await orderService.placeOrder(req.user!.userId, produceId, quantity ?? 1);
      sendSuccess(res, 201, 'Order placed successfully.', order);
    } catch (err) { next(err); }
  },

  async getMyOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { status } = req.query as { status?: string };
      const { orders, total } = await orderService.getMyOrders(req.user!.userId, pagination, status);
      sendSuccess(res, 200, 'Your orders fetched.', orders, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await orderService.getOrderById(
        req.params.id,
        req.user!.userId,
        req.user!.role
      );
      sendSuccess(res, 200, 'Order fetched.', order);
    } catch (err) { next(err); }
  },

  async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await orderService.cancelOrder(req.params.id, req.user!.userId);
      sendSuccess(res, 200, 'Order cancelled.', order);
    } catch (err) { next(err); }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
      sendSuccess(res, 200, 'Order status updated.', order);
    } catch (err) { next(err); }
  },

  async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { status } = req.query as { status?: string };
      const { orders, total } = await orderService.getAllOrders(pagination, status);
      sendSuccess(res, 200, 'All orders fetched.', orders, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },
};
