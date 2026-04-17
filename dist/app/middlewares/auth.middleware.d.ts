import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../utils/jwt';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {
                id: string;
            };
        }
    }
}
export declare const authenticate: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map