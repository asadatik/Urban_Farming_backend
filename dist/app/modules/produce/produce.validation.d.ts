import { z } from 'zod';
export declare const createProduceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    category: z.ZodDefault<z.ZodEnum<["VEGETABLES", "FRUITS", "HERBS", "SEEDS", "TOOLS", "OTHER"]>>;
    availableQuantity: z.ZodDefault<z.ZodNumber>;
    imageUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: number;
    category: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER";
    availableQuantity: number;
    description?: string | undefined;
    imageUrl?: string | undefined;
}, {
    name: string;
    price: number;
    description?: string | undefined;
    category?: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER" | undefined;
    availableQuantity?: number | undefined;
    imageUrl?: string | undefined;
}>;
export declare const updateProduceSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodDefault<z.ZodEnum<["VEGETABLES", "FRUITS", "HERBS", "SEEDS", "TOOLS", "OTHER"]>>>;
    availableQuantity: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    category?: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER" | undefined;
    availableQuantity?: number | undefined;
    imageUrl?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    category?: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER" | undefined;
    availableQuantity?: number | undefined;
    imageUrl?: string | undefined;
}>;
export declare const produceFilterSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["VEGETABLES", "FRUITS", "HERBS", "SEEDS", "TOOLS", "OTHER"]>>;
    minPrice: z.ZodOptional<z.ZodString>;
    maxPrice: z.ZodOptional<z.ZodString>;
    certificationStatus: z.ZodOptional<z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    certificationStatus?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
    limit?: string | undefined;
    page?: string | undefined;
    category?: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER" | undefined;
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
}, {
    search?: string | undefined;
    certificationStatus?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
    limit?: string | undefined;
    page?: string | undefined;
    category?: "VEGETABLES" | "FRUITS" | "HERBS" | "SEEDS" | "TOOLS" | "OTHER" | undefined;
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
}>;
export type CreateProduceInput = z.infer<typeof createProduceSchema>;
export type UpdateProduceInput = z.infer<typeof updateProduceSchema>;
//# sourceMappingURL=produce.validation.d.ts.map