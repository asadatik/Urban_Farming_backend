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
export declare const sendSuccess: <T>(res: Response, statusCode: number, message: string, data: T, meta?: Meta) => Response;
/** Send an error response */
export declare const sendError: (res: Response, statusCode: number, message: string, data?: unknown) => Response;
//# sourceMappingURL=response.d.ts.map