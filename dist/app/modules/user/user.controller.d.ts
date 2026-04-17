import { Request, Response, NextFunction } from 'express';
export declare const userController: {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map