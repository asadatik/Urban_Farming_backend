import { Request } from 'express';
export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
}
export declare const getPagination: (req: Request) => PaginationParams;
//# sourceMappingURL=pagination.d.ts.map