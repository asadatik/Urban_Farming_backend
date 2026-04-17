
import rateLimit from 'express-rate-limit';
import { config } from '../../config/env';
import { sendError } from '../utils/response';

/** General API rate limiter */
export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,   
  max: config.rateLimit.max,            
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(res, 429, 'Too many requests. Please try again later.');
  },
});


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