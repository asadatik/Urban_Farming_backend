"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceFilterSchema = exports.updateProduceSchema = exports.createProduceSchema = void 0;
const zod_1 = require("zod");
exports.createProduceSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(150),
    description: zod_1.z.string().max(1000).optional(),
    price: zod_1.z.number({ required_error: 'Price is required' }).positive('Price must be positive'),
    category: zod_1.z.enum(['VEGETABLES', 'FRUITS', 'HERBS', 'SEEDS', 'TOOLS', 'OTHER']).default('OTHER'),
    availableQuantity: zod_1.z.number().int().min(0).default(0),
    imageUrl: zod_1.z.string().url('Invalid image URL').optional(),
});
exports.updateProduceSchema = exports.createProduceSchema.partial();
exports.produceFilterSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    category: zod_1.z.enum(['VEGETABLES', 'FRUITS', 'HERBS', 'SEEDS', 'TOOLS', 'OTHER']).optional(),
    minPrice: zod_1.z.string().optional(),
    maxPrice: zod_1.z.string().optional(),
    certificationStatus: zod_1.z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});
//# sourceMappingURL=produce.validation.js.map