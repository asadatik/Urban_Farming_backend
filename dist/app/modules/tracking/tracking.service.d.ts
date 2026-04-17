import { PaginationParams } from '../../utils/pagination';
export declare const trackingService: {
    startTracking(userId: string, data: {
        rentalSpaceId: string;
        plantName: string;
        healthNotes?: string;
        plantedDate?: string;
    }): Promise<{
        rentalSpace: {
            id: string;
            location: string;
            size: string;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        plantName: string;
        healthNotes: string | null;
        plantedDate: Date;
        harvestDate: Date | null;
        rentalSpaceId: string;
    }>;
    getMyTrackings(userId: string, pagination: PaginationParams, status?: string): Promise<{
        trackings: ({
            rentalSpace: {
                id: string;
                location: string;
                size: string;
            };
        } & {
            status: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            plantName: string;
            healthNotes: string | null;
            plantedDate: Date;
            harvestDate: Date | null;
            rentalSpaceId: string;
        })[];
        total: number;
    }>;
    getTrackingById(id: string, userId: string, role: string): Promise<{
        rentalSpace: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            vendorId: string;
            location: string;
            size: string;
            availability: boolean;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        plantName: string;
        healthNotes: string | null;
        plantedDate: Date;
        harvestDate: Date | null;
        rentalSpaceId: string;
    }>;
    updateTrackingStatus(id: string, userId: string, data: {
        status: string;
        healthNotes?: string;
        harvestDate?: string;
    }): Promise<{
        rentalSpace: {
            id: string;
            location: string;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        plantName: string;
        healthNotes: string | null;
        plantedDate: Date;
        harvestDate: Date | null;
        rentalSpaceId: string;
    }>;
    deleteTracking(id: string, userId: string): Promise<{
        id: string;
    }>;
    getAllTrackings(pagination: PaginationParams, status?: string): Promise<{
        trackings: ({
            user: {
                name: string;
                email: string;
                id: string;
            };
            rentalSpace: {
                id: string;
                location: string;
            };
        } & {
            status: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            plantName: string;
            healthNotes: string | null;
            plantedDate: Date;
            harvestDate: Date | null;
            rentalSpaceId: string;
        })[];
        total: number;
    }>;
};
//# sourceMappingURL=tracking.service.d.ts.map