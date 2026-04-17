import { Request, Response, NextFunction } from 'express';
export declare const orderController: {
    placeOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
    getOrderById(req: Request, res: Response, next: NextFunction): Promise<void>;
    cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=order.controller.d.ts.map