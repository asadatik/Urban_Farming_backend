import { Request, Response, NextFunction } from 'express';
export declare const rentalController: {
    getRentalSpaces(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRentalById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteRentalSpace(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=rental.controller.d.ts.map