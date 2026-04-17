import { Request, Response, NextFunction } from 'express';
export declare const certificationController: {
    getAllCerts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCertById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyCerts(req: Request, res: Response, next: NextFunction): Promise<void>;
    submitCert(req: Request, res: Response, next: NextFunction): Promise<void>;
    reviewCert(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=certification.controller.d.ts.map