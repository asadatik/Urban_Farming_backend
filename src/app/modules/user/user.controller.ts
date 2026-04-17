
import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const userController = {
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { role, status } = req.query as { role?: string; status?: string };
      const { users, total } = await userService.getAllUsers(pagination, role, status);
      sendSuccess(res, 200, 'Users fetched successfully.', users, {
        page: pagination.page,
        limit: pagination.limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      sendSuccess(res, 200, 'User fetched successfully.', user);
    } catch (err) {
      next(err);
    }
  },

  async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.body;
      const user = await userService.updateUserStatus(req.params.id, status);
      sendSuccess(res, 200, 'User status updated successfully.', user);
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await userService.deleteUser(req.params.id);
      sendSuccess(res, 200, 'User deleted successfully.', result);
    } catch (err) {
      next(err);
    }
  },
};
