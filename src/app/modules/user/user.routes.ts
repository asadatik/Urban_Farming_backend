
import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorise } from '../../middlewares/role.middleware';

const router = Router();

router.use(authenticate, authorise('ADMIN'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

export default router;
