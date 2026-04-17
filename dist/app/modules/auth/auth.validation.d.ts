import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<["VENDOR", "CUSTOMER"]>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    role: "VENDOR" | "CUSTOMER";
}, {
    name: string;
    email: string;
    password: string;
    role?: "VENDOR" | "CUSTOMER" | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.validation.d.ts.map