// src/app/modules/certification/certification.routes.ts
import { Router } from 'express';
import { certificationController } from './certification.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();

// Vendor
router.get('/my', authenticate, authorise('VENDOR'), certificationController.getMyCerts);
router.post('/', authenticate, authorise('VENDOR'), certificationController.submitCert);

// Admin
router.get('/', authenticate, authorise('ADMIN'), certificationController.getAllCerts);
router.get('/:id', authenticate, authorise('ADMIN'), certificationController.getCertById);
router.patch('/:id/review', authenticate, authorise('ADMIN'), certificationController.reviewCert);

export default router;
