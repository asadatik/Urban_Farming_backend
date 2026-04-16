// src/app/middlewares/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit';
import { config } from '../../config/env';
import { sendError } from '../utils/response';

/** General API rate limiter */
export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,   // default: 15 minutes
  max: config.rateLimit.max,             // default: 100 requests
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 429, 'Too many requests. Please try again later.');
  },
});

/**
 * Strict limiter for sensitive auth routes
 * (login, register) — 10 requests per 15 minutes
 */
export const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.authMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: undefined,
  handler: (_req, res) => {
    sendError(
      res,
      429,
      'Too many authentication attempts. Please wait 15 minutes before retrying.'
    );
  },
});