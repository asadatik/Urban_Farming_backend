import { PaginationParams } from '../../utils/pagination';
export declare const vendorService: {
    getAllVendors(pagination: PaginationParams, certStatus?: string): Promise<{
        vendors: ({
            user: {
                name: string;
                email: string;
                status: string;
                id: string;
            };
            sustainabilityCerts: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
                vendorId: string;
                certifyingAgency: string;
                certificationDate: Date;
                expiryDate: Date | null;
                adminNotes: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            farmName: string;
            farmLocation: string;
            farmDescription: string | null;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            userId: string;
        })[];
        total: number;
    }>;
    getVendorById(id: string): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
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
        rentalSpaces: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            vendorId: string;
            location: string;
            size: string;
            availability: boolean;
        }[];
        sustainabilityCerts: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            vendorId: string;
            certifyingAgency: string;
            certificationDate: Date;
            expiryDate: Date | null;
            adminNotes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        farmName: string;
        farmLocation: string;
        farmDescription: string | null;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        userId: string;
    }>;
    updateVendorProfile(userId: string, data: {
        farmName?: string;
        farmLocation?: string;
        farmDescription?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        farmName: string;
        farmLocation: string;
        farmDescription: string | null;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        userId: string;
    }>;
    approveVendor(vendorProfileId: string, status: "APPROVED" | "REJECTED"): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        farmName: string;
        farmLocation: string;
        farmDescription: string | null;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        userId: string;
    }>;
};
//# sourceMappingURL=vendor.service.d.ts.map