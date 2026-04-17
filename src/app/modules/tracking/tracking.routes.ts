
import { Router } from 'express';
import { trackingController } from './tracking.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();

router.use(authenticate);

// customer
router.post('/', authorise('CUSTOMER'), trackingController.startTracking);
router.get('/my', authorise('CUSTOMER'), trackingController.getMyTrackings);
router.get('/:id', authorise('CUSTOMER', 'ADMIN'), trackingController.getTrackingById);

// real-time status update — core feature
router.patch('/:id/status', authorise('CUSTOMER'), trackingController.updateTrackingStatus);
router.delete('/:id', authorise('CUSTOMER'), trackingController.deleteTracking);

// admin
router.get('/', authorise('ADMIN'), trackingController.getAllTrackings);

export default router;
