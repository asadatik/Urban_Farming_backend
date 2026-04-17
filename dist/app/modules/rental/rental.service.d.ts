import { PaginationParams } from '../../utils/pagination';
export interface RentalFilters {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    availability?: string;
}
export declare const rentalService: {
    getRentalSpaces(pagination: PaginationParams, filters: RentalFilters): Promise<{
        spaces: ({
            vendor: {
                id: string;
                farmName: string;
                farmLocation: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            vendorId: string;
            location: string;
            size: string;
            availability: boolean;
        })[];
        total: number;
    }>;
    getRentalById(id: string): Promise<{
        vendor: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        vendorId: string;
        location: string;
        size: string;
        availability: boolean;
    }>;
    createRentalSpace(userId: string, data: {
        location: string;
        size: string;
        price: number;
        description?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        vendorId: string;
        location: string;
        size: string;
        availability: boolean;
    }>;
    updateRentalSpace(id: string, userId: string, data: Partial<{
        location: string;
        size: string;
        price: number;
        availability: boolean;
        description: string;
    }>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: number;
        vendorId: string;
        location: string;
        size: string;
        availability: boolean;
    }>;
    deleteRentalSpace(id: string, userId: string): Promise<{
        id: string;
    }>;
};
//# sourceMappingURL=rental.service.d.ts.map