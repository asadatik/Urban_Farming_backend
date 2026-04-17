
import { Request, Response, NextFunction } from 'express';
import { rentalService } from './rental.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const rentalController = {
  async getRentalSpaces(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { location, minPrice, maxPrice, availability } = req.query as any;
      const { spaces, total } = await rentalService.getRentalSpaces(pagination, {
        location, minPrice, maxPrice, availability,
      });
      sendSuccess(res, 200, 'Rental spaces fetched.', spaces, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },

  async getRentalById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const space = await rentalService.getRentalById(req.params.id);
      sendSuccess(res, 200, 'Rental space fetched.', space);
    } catch (err) { next(err); }
  },

  async createRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const space = await rentalService.createRentalSpace(req.user!.userId, req.body);
      sendSuccess(res, 201, 'Rental space created.', space);
    } catch (err) { next(err); }
  },

  async updateRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const space = await rentalService.updateRentalSpace(req.params.id, req.user!.userId, req.body);
      sendSuccess(res, 200, 'Rental space updated.', space);
    } catch (err) { next(err); }
  },

  async deleteRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await rentalService.deleteRentalSpace(req.params.id, req.user!.userId);
      sendSuccess(res, 200, 'Rental space deleted.', result);
    } catch (err) { next(err); }
  },
};

