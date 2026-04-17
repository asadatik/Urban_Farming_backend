import { PaginationParams } from '../../utils/pagination';
export declare const userService: {
    getAllUsers(pagination: PaginationParams, role?: string, status?: string): Promise<{
        users: {
            vendorProfile: {
                id: string;
                farmName: string;
                certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            } | null;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            status: string;
            id: string;
            createdAt: Date;
        }[];
        total: number;
    }>;
    getUserById(id: string): Promise<{
        vendorProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            farmDescription: string | null;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            userId: string;
        } | null;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        status: string;
        id: string;
        createdAt: Date;
        orders: {
            status: string;
            id: string;
            totalPrice: number;
            orderDate: Date;
        }[];
    }>;
    updateUserStatus(id: string, status: "ACTIVE" | "INACTIVE" | "SUSPENDED"): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        status: string;
        id: string;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map