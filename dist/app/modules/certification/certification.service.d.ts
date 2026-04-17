import { PaginationParams } from '../../utils/pagination';
export declare const certificationService: {
    getAllCerts(pagination: PaginationParams, status?: string): Promise<{
        certs: ({
            vendor: {
                user: {
                    name: string;
                    email: string;
                };
                id: string;
                farmName: string;
                farmLocation: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
            vendorId: string;
            certifyingAgency: string;
            certificationDate: Date;
            expiryDate: Date | null;
            adminNotes: string | null;
        })[];
        total: number;
    }>;
    submitCert(userId: string, data: {
        certifyingAgency: string;
        certificationDate: string;
        expiryDate?: string;
        documentUrl?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        vendorId: string;
        certifyingAgency: string;
        certificationDate: Date;
        expiryDate: Date | null;
        adminNotes: string | null;
    }>;
    getMyCerts(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        vendorId: string;
        certifyingAgency: string;
        certificationDate: Date;
        expiryDate: Date | null;
        adminNotes: string | null;
    }[]>;
    reviewCert(certId: string, status: "APPROVED" | "REJECTED", adminNotes?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        vendorId: string;
        certifyingAgency: string;
        certificationDate: Date;
        expiryDate: Date | null;
        adminNotes: string | null;
    }>;
    getCertById(id: string): Promise<{
        vendor: {
            user: {
                name: string;
                email: string;
            };
            farmName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        vendorId: string;
        certifyingAgency: string;
        certificationDate: Date;
        expiryDate: Date | null;
        adminNotes: string | null;
    }>;
};
//# sourceMappingURL=certification.service.d.ts.map