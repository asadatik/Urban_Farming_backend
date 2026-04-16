// src/app/utils/response.ts
// Standardised API Response helpers

import { Response } from 'express';

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Meta;
}

/** Send a successful response */
export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  meta?: Meta
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    statusCode,
    message,
    data,
    ...(meta && {
      meta: {
        ...meta,
        totalPages: meta.total ? Math.ceil(meta.total / meta.limit) : 0,
      },
    }),
  };
  return res.status(statusCode).json(payload);
};

/** Send an error response */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null
): Response => {
  const payload: ApiResponse = {
    success: false,
    statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(payload);
};