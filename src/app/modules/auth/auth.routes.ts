
import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';

import { authLimiter } from '../../middlewares/rateLimit.middleware';
import { signupSchema, loginSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';



const router = Router();


router.post('/signup', authLimiter, validate(signupSchema), authController.signup);


router.post('/login', authLimiter, validate(loginSchema), authController.login);

router.get('/me', authenticate, authController.getMe);

export default router;