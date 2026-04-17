
import { Request, Response, NextFunction } from 'express';
import { certificationService } from './certification.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const certificationController = {
  async getAllCerts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { status } = req.query as { status?: string };
      const { certs, total } = await certificationService.getAllCerts(pagination, status);
      sendSuccess(res, 200, 'Certifications fetched.', certs, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },

  async getCertById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cert = await certificationService.getCertById(req.params.id);
      sendSuccess(res, 200, 'Certification fetched.', cert);
    } catch (err) { next(err); }
  },

  async getMyCerts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const certs = await certificationService.getMyCerts(req.user!.userId);
      sendSuccess(res, 200, 'Your certifications fetched.', certs);
    } catch (err) { next(err); }
  },

  async submitCert(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cert = await certificationService.submitCert(req.user!.userId, req.body);
      sendSuccess(res, 201, 'Certification submitted for review.', cert);
    } catch (err) { next(err); }
  },

  async reviewCert(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, adminNotes } = req.body as { status: 'APPROVED' | 'REJECTED'; adminNotes?: string };
      const cert = await certificationService.reviewCert(req.params.id, status, adminNotes);
      sendSuccess(res, 200, `Certification ${status.toLowerCase()} successfully.`, cert);
    } catch (err) { next(err); }
  },
};
