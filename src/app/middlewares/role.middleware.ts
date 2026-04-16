// src/app/middlewares/role.middleware.ts
// Role-Based Access Control (RBAC) guard
// Usage: router.get('/admin-only', authenticate, authorise('ADMIN'), handler)

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';

/**
 * authorise(...roles) — middleware factory.
 * Restricts the route to users whose role is in the provided list.
 */
export const authorise = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return next(
        new AppError(
          `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`,
          403
        )
      );
    }

    next();
  };
};