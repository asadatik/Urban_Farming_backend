// src/app/modules/vendor/vendor.routes.ts
import { Router } from 'express';
import { vendorController } from './vendor.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();

// Public
router.get('/:id', vendorController.getVendorById);

//  update own profile
router.patch('/me/profile', authenticate, authorise('VENDOR'), vendorController.updateMyProfile);

// Admin only
router.get('/', authenticate, authorise('ADMIN'), vendorController.getAllVendors);
router.patch('/:id/approve', authenticate, authorise('ADMIN'), vendorController.approveVendor);

export default router;
