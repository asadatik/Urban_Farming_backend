import { Request, Response, NextFunction } from 'express';
export declare const trackingController: {
    startTracking(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyTrackings(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTrackingById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateTrackingStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteTracking(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllTrackings(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=tracking.controller.d.ts.map