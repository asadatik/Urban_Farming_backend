
import { Router } from 'express';
import { rentalController } from './rental.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();

// Public
router.get('/', rentalController.getRentalSpaces);
router.get('/:id', rentalController.getRentalById);

// Vendor only
router.post('/', authenticate, authorise('VENDOR'), rentalController.createRentalSpace);
router.patch('/:id', authenticate, authorise('VENDOR'), rentalController.updateRentalSpace);
router.delete('/:id', authenticate, authorise('VENDOR'), rentalController.deleteRentalSpace);

export default router;
