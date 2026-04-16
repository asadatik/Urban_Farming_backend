// src/app/modules/produce/produce.validation.ts
import { z } from 'zod';

export const createProduceSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().max(1000).optional(),
  price: z.number({ required_error: 'Price is required' }).positive('Price must be positive'),
  category: z.enum(['VEGETABLES', 'FRUITS', 'HERBS', 'SEEDS', 'TOOLS', 'OTHER']).default('OTHER'),
  availableQuantity: z.number().int().min(0).default(0),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

export const updateProduceSchema = createProduceSchema.partial();

export const produceFilterSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  category: z.enum(['VEGETABLES', 'FRUITS', 'HERBS', 'SEEDS', 'TOOLS', 'OTHER']).optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  certificationStatus: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});

export type CreateProduceInput = z.infer<typeof createProduceSchema>;
export type UpdateProduceInput = z.infer<typeof updateProduceSchema>;