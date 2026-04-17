import { Request, Response, NextFunction } from 'express';
export declare const produceController: {
    getMarketplace(req: Request, res: Response, next: NextFunction): Promise<void>;
    getProduceById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyProduce(req: Request, res: Response, next: NextFunction): Promise<void>;
    createProduce(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProduce(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteProduce(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateCertificationStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=produce.controller.d.ts.map