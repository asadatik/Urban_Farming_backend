import { SignupInput, LoginInput } from './auth.validation';
import { AuthTokenResponse } from './auth.interface';
export declare const authService: {
    signup(payload: SignupInput): Promise<AuthTokenResponse>;
    /**
     * Login
     */
    login(payload: LoginInput): Promise<AuthTokenResponse>;
    /**
     * Get own profile
     */
    getMe(userId: string): Promise<{
        vendorProfile: {
            id: string;
            farmName: string;
            farmLocation: string;
            certificationStatus: import(".prisma/client").$Enums.CertificationStatus;
        } | null;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        status: string;
        id: string;
        createdAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map