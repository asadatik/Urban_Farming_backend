
import { Router } from 'express';
import { produceController } from './produce.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createProduceSchema, updateProduceSchema } from './produce.validation';

const router = Router();

//  Public
router.get('/', produceController.getMarketplace);
router.get('/:id', produceController.getProduceById);

//Vendor routes
router.get('/my/listings', authenticate, authorise('VENDOR'), produceController.getMyProduce);
router.post(
  '/',
  authenticate,
  authorise('VENDOR'),
  validate(createProduceSchema),
  produceController.createProduce
);
router.patch(
  '/:id',
  authenticate,
  authorise('VENDOR'),
  validate(updateProduceSchema),
  produceController.updateProduce
);
router.delete('/:id', authenticate, authorise('VENDOR'), produceController.deleteProduce);

// Admin routes
router.patch(
  '/:id/certification',
  authenticate,
  authorise('ADMIN'),
  produceController.updateCertificationStatus
);

export default router;