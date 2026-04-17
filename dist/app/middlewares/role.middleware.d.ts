import { Request, Response, NextFunction } from 'express';
type UserRole = 'ADMIN' | 'VENDOR' | 'CUSTOMER';
export declare const authorise: (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=role.middleware.d.ts.map