import { PaginationParams } from '../../utils/pagination';
export declare const orderService: {
    placeOrder(userId: string, produceId: string, quantity: number): Promise<{
        produce: {
            name: string;
            id: string;
            price: number;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        vendorId: string;
        produceId: string;
        quantity: number;
        totalPrice: number;
        orderDate: Date;
    }>;
    getMyOrders(userId: string, pagination: PaginationParams, status?: string): Promise<{
        orders: ({
            produce: {
                name: string;
                id: string;
                price: number;
                imageUrl: string | null;
            };
        } & {
            status: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            vendorId: string;
            produceId: string;
            quantity: number;
            totalPrice: number;
            orderDate: Date;
        })[];
        total: number;
    }>;
    getOrderById(id: string, userId: string, role: string): Promise<{
        produce: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            description: string | null;
            price: number;
            category: import(".prisma/client").$Enums.ProduceCategory;
            availableQuantity: number;
            imageUrl: string | null;
            vendorId: string;
            isActive: boolean;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        vendorId: string;
        produceId: string;
        quantity: number;
        totalPrice: number;
        orderDate: Date;
    }>;
    cancelOrder(id: string, userId: string): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        vendorId: string;
        produceId: string;
        quantity: number;
        totalPrice: number;
        orderDate: Date;
    }>;
    updateOrderStatus(id: string, status: string): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        vendorId: string;
        produceId: string;
        quantity: number;
        totalPrice: number;
        orderDate: Date;
    }>;
    getAllOrders(pagination: PaginationParams, status?: string): Promise<{
        orders: ({
            user: {
                name: string;
                email: string;
                id: string;
            };
            produce: {
                name: string;
                id: string;
            };
        } & {
            status: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            vendorId: string;
            produceId: string;
            quantity: number;
            totalPrice: number;
            orderDate: Date;
        })[];
        total: number;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map