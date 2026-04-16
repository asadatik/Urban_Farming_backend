// src/app/modules/auth/auth.routes.ts
import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';

import { authLimiter } from '../../middlewares/rateLimit.middleware';
import { signupSchema, loginSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';



const router = Router();

// POST /api/v1/auth/signup  — rate-limited + validated
router.post('/signup', authLimiter, validate(signupSchema), authController.signup);

// POST /api/v1/auth/login   — rate-limited + validated
router.post('/login', authLimiter, validate(loginSchema), authController.login);

// GET  /api/v1/auth/me      — protected
router.get('/me', authenticate, authController.getMe);

export default router;