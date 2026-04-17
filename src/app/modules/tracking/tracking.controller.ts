
import { Request, Response, NextFunction } from 'express';
import { trackingService } from './tracking.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const trackingController = {
  async startTracking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tracking = await trackingService.startTracking(req.user!.userId, req.body);
      sendSuccess(res, 201, 'Plant tracking started.', tracking);
    } catch (err) { next(err); }
  },

  async getMyTrackings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { status } = req.query as { status?: string };
      const { trackings, total } = await trackingService.getMyTrackings(
        req.user!.userId, pagination, status
      );
      sendSuccess(res, 200, 'Your plant trackings fetched.', trackings, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },

  async getTrackingById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tracking = await trackingService.getTrackingById(
        req.params.id, req.user!.userId, req.user!.role
      );
      sendSuccess(res, 200, 'Tracking record fetched.', tracking);
    } catch (err) { next(err); }
  },

  async updateTrackingStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tracking = await trackingService.updateTrackingStatus(
        req.params.id, req.user!.userId, req.body
      );
      sendSuccess(res, 200, `Plant status updated to "${req.body.status}".`, tracking);
    } catch (err) { next(err); }
  },

  async deleteTracking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await trackingService.deleteTracking(req.params.id, req.user!.userId);
      sendSuccess(res, 200, 'Tracking record deleted.', result);
    } catch (err) { next(err); }
  },

  async getAllTrackings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { status } = req.query as { status?: string };
      const { trackings, total } = await trackingService.getAllTrackings(pagination, status);
      sendSuccess(res, 200, 'All plant trackings fetched.', trackings, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },
};
