// src/app/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';

// Extend Express Request to carry the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string };
    }
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Please provide a Bearer token.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, status: true },
    });

    if (!user) throw new AppError('User no longer exists.', 401);
    if (user.status === 'SUSPENDED')
      throw new AppError('Your account has been suspended. Contact support.', 403);
    if (user.status === 'INACTIVE')
      throw new AppError('Your account is inactive.', 403);

    req.user = { userId: user.id, id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
};