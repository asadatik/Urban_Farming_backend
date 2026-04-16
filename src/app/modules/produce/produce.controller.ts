// src/app/modules/produce/produce.controller.ts
import { Request, Response, NextFunction } from 'express';
import { produceService } from './produce.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const produceController = {
  // ── Public ────────────────────────────────────────────────────

  async getMarketplace(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { search, category, minPrice, maxPrice, certificationStatus } = req.query as any;
      const { produces, total } = await produceService.getMarketplace(pagination, {
        search,
        category,
        minPrice,
        maxPrice,
        certificationStatus,
      });
      sendSuccess(res, 200, 'Marketplace produce fetched.', produces, {
        page: pagination.page,
        limit: pagination.limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  },

  async getProduceById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const produce = await produceService.getProduceById(req.params.id);
      sendSuccess(res, 200, 'Produce fetched.', produce);
    } catch (err) {
      next(err);
    }
  },

  // ── Vendor ────────────────────────────────────────────────────

  async getMyProduce(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const vendorProfileId = await produceService.getVendorProfileId(req.user!.userId);
      const { produces, total } = await produceService.getVendorProduce(vendorProfileId, pagination);
      sendSuccess(res, 200, 'Your produce listings fetched.', produces, {
        page: pagination.page,
        limit: pagination.limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  },

  async createProduce(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendorProfileId = await produceService.getVendorProfileId(req.user!.userId);
      const produce = await produceService.createProduce(vendorProfileId, req.body);
      sendSuccess(res, 201, 'Produce listing created. Awaiting certification approval.', produce);
    } catch (err) {
      next(err);
    }
  },

  async updateProduce(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendorProfileId = await produceService.getVendorProfileId(req.user!.userId);
      const produce = await produceService.updateProduce(req.params.id, vendorProfileId, req.body);
      sendSuccess(res, 200, 'Produce updated.', produce);
    } catch (err) {
      next(err);
    }
  },

  async deleteProduce(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vendorProfileId = await produceService.getVendorProfileId(req.user!.userId);
      const result = await produceService.deleteProduce(req.params.id, vendorProfileId);
      sendSuccess(res, 200, 'Produce deleted.', result);
    } catch (err) {
      next(err);
    }
  },

  // ── Admin ─────────────────────────────────────────────────────

  async updateCertificationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { certificationStatus } = req.body;
      const produce = await produceService.updateCertificationStatus(
        req.params.id,
        certificationStatus
      );
      sendSuccess(res, 200, `Produce certification status updated to ${certificationStatus}.`, produce);
    } catch (err) {
      next(err);
    }
  },
};