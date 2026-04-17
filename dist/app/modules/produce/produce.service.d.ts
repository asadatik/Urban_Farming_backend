import { PaginationParams } from '../../utils/pagination';
import { CreateProduceInput, UpdateProduceInput } from './produce.validation';
export interface ProduceFilters {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    certificationStatus?: string;
}
export declare const produceService: {
    getMarketplace(pagination: PaginationParams, filters: ProduceFilters): Promise<{
        produces: {
            name: string;
            id: string;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            description: string | null;
            price: number;
            category: import(".prisma/client").$Enums.ProduceCategory;
            availableQuantity: number;
            imageUrl: string | null;
            vendor: {
                id: string;
                farmName: string;
                farmLocation: string;
            };
        }[];
        total: number;
    }>;
    getProduceById(id: string): Promise<{
        vendor: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        };
    } & {
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
    }>;
    getVendorProduce(vendorProfileId: string, pagination: PaginationParams): Promise<{
        produces: {
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
        }[];
        total: number;
    }>;
    createProduce(vendorProfileId: string, data: CreateProduceInput): Promise<{
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
    }>;
    updateProduce(id: string, vendorProfileId: string, data: UpdateProduceInput): Promise<{
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
    }>;
    deleteProduce(id: string, vendorProfileId: string): Promise<{
        id: string;
    }>;
    updateCertificationStatus(id: string, certificationStatus: "APPROVED" | "REJECTED" | "PENDING"): Promise<{
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
    }>;
    getVendorProfileId(userId: string): Promise<string>;
};
//# sourceMappingURL=produce.service.d.ts.map