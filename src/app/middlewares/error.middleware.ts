
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import { sendError } from '../utils/response';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }


  if (err instanceof ZodError) {
    const messages = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    return sendError(res, 400, 'Validation Error', messages);
  }

 
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = (err.meta?.target as string[])?.join(', ') ?? 'field';
      return sendError(res, 409, `Duplicate value on unique field: ${fields}`);
    }
    if (err.code === 'P2025') {
      return sendError(res, 404, 'Record not found');
    }
    return sendError(res, 400, `Database error: ${err.message}`);
  }

  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'Invalid token. Please log in again.');
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 401, 'Your token has expired. Please log in again.');
  }


  console.error(' UNHANDLED ERROR:', err);
  return sendError(
    res,
    500,
    process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  );
};

export const notFoundHandler = (req: Request, res: Response): Response => {
  return sendError(res, 404, `Route ${req.originalUrl} not found`);
};