// src/app/modules/vendor/vendor.controller.ts
import { Request, Response, NextFunction } from 'express';
import { vendorService } from './vendor.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const vendorController = {
  async getAllVendors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { certStatus } = req.query as { certStatus?: string };
      const { vendors, total } = await vendorService.getAllVendors(pagination, certStatus);
      sendSuccess(res, 200, 'Vendors fetched.', vendors, {
        page: pagination.page,
        limit: pagination.limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  },

  async getVendorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendor = await vendorService.getVendorById(req.params.id);
      sendSuccess(res, 200, 'Vendor profile fetched.', vendor);
    } catch (err) {
      next(err);
    }
  },

  async updateMyProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendor = await vendorService.updateVendorProfile(req.user!.userId, req.body);
      sendSuccess(res, 200, 'Vendor profile updated.', vendor);
    } catch (err) {
      next(err);
    }
  },

  async approveVendor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.body as { status: 'APPROVED' | 'REJECTED' };
      const vendor = await vendorService.approveVendor(req.params.id, status);
      sendSuccess(res, 200, `Vendor certification ${status.toLowerCase()}.`, vendor);
    } catch (err) {
      next(err);
    }
  },
};
